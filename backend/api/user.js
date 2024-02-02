import { database } from '../config/firebaseConfig';
import { get, child, ref, set, push, getDatabase, remove } from 'firebase/database';
import { getUserID } from '../dbFunctions';
import { getAuth } from 'firebase/auth';
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAllListings } from './listing';

// ^^ Import whatever we need for this...
// NOTE************ add additional parameters when needed!!! This is just a baseline.

// Function to create a new user
export function createUser(fname, lname, username, email, userId) {
    const userReference = ref(database, 'dorm_swap_shop/users/');
    const newUserReference = push(userReference);

    const publicUserData = {
        fname: fname,
        lname: lname,
        username: username,
        rating: 0,
        profileImage: "",
        bio: "",
        listings: []
    };

    const privateUserData = {
        userId: userId,
        email: email,
        timestamp: new Date().toISOString(),
        chats: [],
        savedListings: [],
        blockedUsers: []
    };

    const userData = {
        public: publicUserData,
        private: privateUserData
    };

    set(newUserReference, userData);
}

export function getUser(){
    const userId = getUserID();
    getUserByID(userId);
}

// Function to read user data
export function getUserByID(userId) {
    const db = getDatabase();
    const usersRef = ref(db, "dorm_swap_shop/users/");

    return get(usersRef).then((snapshot) => {
        let userData;
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            if (data.private.userId === userId) {
                userData = data;
            }
        });
        return userData;
    }).catch((error) => {
        console.error(error);
    });
}

export async function getAllUserDataForProfile() {
    const db = getDatabase();
    const userId = getUserID();
    const usersRef = ref(db, "dorm_swap_shop/users/");

    return get(usersRef).then((snapshot) => {
        let userData;
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            if (data.private.userId === userId) {
                userData = data;
                
            }
        });
        return userData;
    }).catch((error) => {
        console.error(error);
    });
}

export async function getUserPushIdFromFirebaseRealtime() {
    const db = getDatabase();
    const userId = getUserID();
    const usersRef = ref(db, "dorm_swap_shop/users/");

    return get(usersRef).then((snapshot) => {
        let pushId;
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            if (data.private.userId === userId) {
                pushId = childSnapshot.key;
            }
        });
        return pushId;
    }).catch((error) => {
        console.error(error);
        throw error;
    });
}

export async function getUsernameByID(userId) {
    const user = await getUserByID(userId);

    if (user != null && user.public.fname != null && user.public.lname != null)
        return user.public.fname + " " + user.public.lname;
    else
        return "Unknown User";
}

// Get the users saved listings. // TODO
export async function getUserSavedListings() {
    const userId = getUserID();
    const usersRef = ref(database, "dorm_swap_shop/users/");

    return get(usersRef).then(async (snapshot) => {
        let userData;
        snapshot.forEach((childSnapshot) => {
            // Get the user data for the current user
            const data = childSnapshot.val();
            if (data.private.userId === userId) {
                userData = data;
            }
        });
        if (userData && userData.private.savedListings) {
            const savedListingsIds = userData.private.savedListings || [];
            const userSavedListings = [];

            for (const element of savedListingsIds) {
                const listingSnapshot = await get(ref(database, `dorm_swap_shop/listings/${element}`));
                const listingData = listingSnapshot.val();
                if (listingData) {
                    userSavedListings.push(listingData);
                }
            }
    
            return userSavedListings;
        } else {
            console.log("DATABASE: User has no listings saved to their account.");
        }
    }).catch((error) => {
        console.error(error);
    });
}

// Function to delete a user
export function deleteUser() {
    const user = getAuth().currentUser;
    const userId = user.uid;

    deleteUserFromRealtimeDatabase(userId);
    deleteUserListingsFromRealtimeDatabase(userId);

    // Delete from Firebase auth
    user.delete().then(() => {
        console.log("User account deleted.");
    }).catch((error) => {
        console.log("Error: Unable to delete account. Please try again");
    });
}

export async function deleteUserListingsFromRealtimeDatabase(userId) {
    const db = getDatabase();
    const listingsReference = ref(db, "dorm_swap_shop/listings/");

    const snapshot = await get(listingsReference);

    if (snapshot.exists()) {
        const listingsData = snapshot.val();

        await Promise.all(Object.entries(listingsData).map(async ([listingKey, listing]) => {
            // Check if the user ID matches
            if (listing.user === userId) {
                // Delete the listing
                await remove(ref(db, `dorm_swap_shop/listings/${listingKey}`));
            }
        }));
        console.log("DATABASE: Deleted user listings from Realtime database");

    } else {
        console.log("DATABASE: No data available to delete")
    }
}

export async function deleteUserFromRealtimeDatabase(userId) {
    const db = getDatabase();
    const usersRef = ref(db, "dorm_swap_shop/users/");

    return get(usersRef).then(async (snapshot) => {
        let userKey;
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            if (data.private.userId === userId) {
                userKey = childSnapshot.key;
            }
        });
        if (userKey) {
            // Delete the user
            await remove(ref(db, `dorm_swap_shop/users/${userKey}`));
            console.log("DATABASE: Deleted user from Realtime database");
        } else {
            console.log("DATABASE: No user found with matching ID");
        }
    }).catch((error) => {
        console.error(error);
    });
}

// Function to update a user
export function updateUser(userId, userData) {
    // Implement the functionality to update user data.
    // This will be used when the user wants to edit their profile.
}

// TODO: Finish working through this
export async function uploadProfileImage(uri) {
    try {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const userId = await getUserPushIdFromFirebaseRealtime();
        console.log("DATABASE: " + userId);
        
        if (userId) {
            const storage = getStorage();
            const storageRef = sRef(storage, "profileImages/" + new Date().getTime());
            await uploadBytesResumable(storageRef, blob);
            blob.close();

            const downloadURL = await getDownloadURL(storageRef);
            const profileImageRef = ref(database, `dorm_swap_shop/users/${userId}/public/profileImage`);
            await set(profileImageRef, downloadURL);
            console.log("DATABASE: " + downloadURL);
        } else {
            console.error("DATABASE: User ID is undefined or null");
        }    
    } catch (error) {
        console.error("DATABASE: Error in uploading profile image: ", error);
        throw error;
    }
}