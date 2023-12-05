import { database } from '../config/firebaseConfig';
import { get, child, ref, set, push, getDatabase } from 'firebase/database';
import { getUserID } from '../dbFunctions';

// ^^ Import whatever we need for this...
// NOTE************ add additional parameters when needed!!! This is just a baseline.

// Function to create a new user
export function createUser(fname, lname, username, email, userId) {

    // Reference users in database
    const userReference = ref(database, 'dorm_swap_shop/users/');

    // Generates a unique ID
    const newUserReference = push(userReference);

    // Gets the unique ID
    // const userId = getUserID();

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

    // return userId;
}

// Function to read user data
export function getUser() {
    const db = getDatabase();
    const userId = getUserID();
    const usersRef = ref(db, `dorm_swap_shop/users/`);

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

export function getUserSavedListings() {
    const db = getDatabase();
    const userId = getUserID();
    const usersRef = ref(db, `dorm_swap_shop/users/`);

    return get(usersRef).then((snapshot) => {
        let userData;
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            if (data.private.userId === userId) {
                userData = data;
            }
        });
        if (userData && userData.private.savedListings) {
            const savedListingsRef = ref(db, `dorm_swap_shop/listings/`);
            const savedListingsPromises = userData.private.savedListings.map((listingId) => {
                return get(child(savedListingsRef, listingId));
            });
            return Promise.all(savedListingsPromises).then((savedListings) => {
                return savedListings.filter(listing => listing !== undefined);
            });
        } else {
            console.log("User has no listings saved to their account.");
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

// Function to delete a user
export function deleteUser(userId) {
    // Implement the functionality to delete user data.
    // This will be used when a user wants to delete their account.

    // We could also use this say if the user has 1 star rating we can
    // automatically delete the account. 
}


// Can add additional functions in here that deal with the user
// and curtail them to our needs.
