import { database } from '../config/firebaseConfig';
import { get, ref, set, push, remove } from 'firebase/database';
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

    // Set the listing data
    await set(newListingReference, listingData);

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

        return downloadURL;
    } catch (error) {
        console.error("Error in uploadImageAsync: ", error);
        throw error;
    }
}

// Gets all listings in the database for home screen 
export async function getAllListings() {
    const listingsReference = ref(database, "dorm_swap_shop/listings/");

    return get(listingsReference)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const listingsData = snapshot.val();
                const sortedListings = Object.values(listingsData).sort((a, b) => b.timestamp - a.timestamp);
                return sortedListings;
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
    const listingsReference = ref(database, "dorm_swap_shop/listings/");
    const userId = getUserID();
    
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
    const userId = getUserID();
    const usersRef = ref(database, `dorm_swap_shop/users/`);

    get(usersRef)
        .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const userData = childSnapshot.val();
                if (userData.private.userId === userId) {
                    const savedListingsRef = ref(database, `dorm_swap_shop/users/${childSnapshot.key}/private/savedListings`);
                    get(savedListingsRef)
                        .then((savedListingsSnapshot) => {
                            let savedListings = savedListingsSnapshot.val();
                            if (!Array.isArray(savedListings)) {
                                savedListings = [];
                            }
                            savedListings.push(listingId);
                            set(savedListingsRef, savedListings);
                            console.log("DATABASE: Saved listing " + listingId + " to user " + userData.private.userId);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            });
        })
        .catch((error) => {
            console.error(error);
        });
}

export function unsaveListing(listingId) {
    const userId = getUserID();
    const usersRef = ref(database, `dorm_swap_shop/users/`);

    get(usersRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val();
            if (userData.private.userId === userId) {
                // Remove the listingId from the savedListings array
                const savedListingsRef = ref(database, `dorm_swap_shop/users/${childSnapshot.key}/private/savedListings`);
                get(savedListingsRef).then((savedListingsSnapshot) => {
                    let savedListings = savedListingsSnapshot.val() || [];
                    const index = savedListings.indexOf(listingId);
                    if (index !== -1) {
                        savedListings.splice(index, 1);
                        set(savedListingsRef, savedListings);
                        console.log("DATABASE: Unsaved listing " + listingId + " from user " + userData.private.userId);
                    }
                });
            }
        });
    }).catch((error) => {
        console.error(error);
    });
}

export async function isListingFavorited(listingId) {
    const userId = getUserID();
    const usersRef = ref(database, `dorm_swap_shop/users/`);

    return get(usersRef).then((snapshot) => {
        let isFavorited = false;
        snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val();
            if (userData.private.userId === userId) {
                const savedListings = userData.private.savedListings || [];
                if (Array.isArray(savedListings)) {
                    isFavorited = savedListings.includes(listingId);
                }
            }
        });
        return isFavorited;
    }).catch((error) => {
        console.error(error);
        console.log("Error checking if user " + userId + " favorited listing");
    });
}

// Function to update listing
export function updateListing(listingId, title, description, price, category, condition) {
    const listingRef = ref(database, `dorm_swap_shop/listings/${listingId}`);

    const listingData = {
        title: title,
        description: description,
        price: price,
        category: category,
        condition: condition,
    };

    set(listingRef, listingData, { merge: true });
}

// Function to delete listing
export async function deleteListing(listingId) {
    const userId = getUserID();
    const listingRef = ref(database, `dorm_swap_shop/listings/${listingId}`);
        
    // Check for ownership
    const snapshot = await get(listingRef);
    const listingData = snapshot.val();

    // Check if the listing belongs to the user
    if (listingData && listingData.user === userId) {
        // Delete the listing
        await remove(listingRef);
        console.log(`Listing ${listingId} was deleted.`);
    } else {
        console.error(`User ${userId} does not own listing ${listingId}.`);
    }
}