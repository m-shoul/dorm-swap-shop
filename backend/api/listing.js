import { database } from '../config/firebaseConfig';
import { get, ref, set, push, remove, getDatabase } from 'firebase/database';
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getUserID } from '../dbFunctions';

// Get a reference to the storage database
const storage = getStorage();

export async function createListing(userId, title, description, price, category, condition, location, images) {
    // Reference listings in the database
    const listingReference = ref(database, 'dorm_swap_shop/listings');

    // Generates a unique ID for the listing
    const newListingReference = push(listingReference);

    // Gets the unique listing ID
    const listingId = newListingReference.key;

    const listingData = {
        listingId: listingId,
        user: userId,
        title: title,
        description: description,
        price: price,
        category: category,
        condition: condition,
        status: "Available", // By default, the status is set to "Available"
        timestamp: new Date().getTime(), // Current timestamp
        location: location,
        reports: [], // Initialize with an empty array of reports
        images: [], // Initialize with an empty array for images
    };

    console.log(listingData);

    // Set the listing data
    await set(newListingReference, listingData);

    console.log(images);
    // If an image is provided, upload it and update the listing
    if (images) {
        const imagesRef = ref(database, `dorm_swap_shop/listings/${listingId}/images`);
        const downloadURLs = await Promise.all(images.map(image => uploadImageAsync(image, imagesRef)));
        await set(imagesRef, downloadURLs);
    }

    return listingId;
}

async function uploadImageAsync(uri, imagesRef) {
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
    
        const storageRef = sRef(storage, "test/" + new Date().getTime());
        await uploadBytesResumable(storageRef, blob);
    
        blob.close();
    
        const downloadURL = await getDownloadURL(storageRef);

        console.log(downloadURL);
        console.log(imagesRef);
    
        return downloadURL;
    } catch (error) {
        console.error("Error in uploadImageAsync: ", error);
        throw error;
    }
}

// Gets all listings in the database for home screen 
export function getAllListings() {
    const db = getDatabase();
    const listingsReference = ref(db, "dorm_swap_shop/listings/");

    return get(listingsReference)
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available");
                return [];
            }
        })
        .catch((error) => {
            console.error("Error fetching listings:", error);
            return [];
        });
};

// Gets listings posted by user
export function getUserListings() {
    const db = getDatabase();
    const listingsReference = ref(db, "dorm_swap_shop/listings/");
    userId = getUserID();
    console.log("userId: " + userId);
    return get(listingsReference)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const listingsData = snapshot.val();
                // Filter listings by the logged-in user's ID
                return Object.values(listingsData).filter((listing) => listing.user === userId);
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error("Error fetching listings:", error);
        });
}

export function saveListing(listingId) {
    const db = getDatabase();
    const userId = getUserID();
    const usersRef = ref(db, `dorm_swap_shop/users/`);

    get(usersRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val();
            // Check if the userId matches the current user's userId
            if (userData.private.userId === userId) {
                // Add the listingId to the savedListings array
                const savedListingsRef = ref(db, `dorm_swap_shop/users/${childSnapshot.key}/private/savedListings`);
                get(savedListingsRef).then((savedListingsSnapshot) => {
                    let savedListings = savedListingsSnapshot.val() || [];
                    savedListings.push(listingId);
                    set(savedListingsRef, savedListings);
                });
            }
        });
    }).catch((error) => {
        console.error(error);
    });
}


export function unsaveListing(listingId) {
    const db = getDatabase();
    const userId = getUserID();
    const usersRef = ref(db, `dorm_swap_shop/users/`);

    get(usersRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val();
            if (userData.private.userId === userId) {
                // Remove the listingId from the savedListings array
                const savedListingsRef = ref(db, `dorm_swap_shop/users/${childSnapshot.key}/private/savedListings`);
                get(savedListingsRef).then((savedListingsSnapshot) => {
                    let savedListings = savedListingsSnapshot.val() || [];
                    const index = savedListings.indexOf(listingId);
                    if (index !== -1) {
                        savedListings.splice(index, 1);
                        set(savedListingsRef, savedListings);
                    }
                });
            }
        });
    }).catch((error) => {
        console.error(error);
    });
}


// Function to update a user
export function updateListing(listingId, listingData) {
    // Implement the functionality to update a listing.
    // This will be used when the user wants to update a listing
    // from their profile.
}

// Function to delete a user
export function deleteListing(listingId) {
    // Implement the functionality to delete a listing.
    // This will be used when a user wants to delete their listing.

    // Somewhere we can keep track of the number of reports and then
    // automatically delete the listing or something. Or if its reported
    // we can just have it deleted and then we go in and check out the
    // listing/user who posted it.
}


// Can add additional functions in here that deal with the listings
// and curtail them to our needs.


