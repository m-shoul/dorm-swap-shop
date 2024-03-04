import { database } from '../config/firebaseConfig';
import { get, ref, set, push, remove, update } from 'firebase/database';
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getUserID } from '../dbFunctions';
import { Alert } from 'react-native';

// NSFW content
import { load } from 'nsfwjs';
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';


// Get a reference to the storage database
const storage = getStorage();

export async function createListing(userId, title, description, price, category, condition, location, images) {

    // If images are provided, check them first
    let downloadURLs = [];
    if (images) {
        // Process each image and collect the processed URLs
        downloadURLs = await Promise.all(images.map(image => uploadImageAsync(image)));
    }

    // Check if any image is unsafe
    const isUnsafe = downloadURLs.some(url => url === "unsafe");

    // If any image is unsafe, abort listing creation
    if (isUnsafe) {
        alert("One or more images contain unsafe content. Listing creation aborted. Please ensure all images are appropriate.");
        return null;
    }

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
        images: downloadURLs, // Initialize with an empty array for images
    };

    // Set the listing data
    await set(newListingReference, listingData);
    alert("Post created!");

    return listingId;
}

async function uploadImageAsync(uri) {  
    try {
        // Initialize TensorFlow.js
        await tf.ready();

        // Load NSFWJS model
        const model = await load(bundleResourceIO(require("../../nsfw-model.json"), require("../../nsfw-weights.bin")));

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

        // Upload image to Firebase Storage
        const storageRef = sRef(storage, "test/" + new Date().getTime());
        console.log("Uploading image to Firebase Storage")
        const uploadTaskSnapshot = await uploadBytesResumable(storageRef, blob);
        console.log("Retrieving from firebase storage");
        const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

        // Fetch the uploaded image for processing
        const response = await fetch(downloadURL);
        const imageData = await response.arrayBuffer();

        // Convert image to tensor
        console.log("Converting image to tensor");
        const imageTensor = decodeJpeg(new Uint8Array(imageData));

        // Classify image for adult content
        const predictions = await model.classify(imageTensor);

        console.log("Predictions: ", predictions);
        // Predictions:  [{"className": "Neutral", "probability": 0.53271484375}, 
        //                {"className": "Drawing", "probability": 0.398193359375}, 
        //                {"className": "Hentai", "probability": 0.06640625}, 
        //                {"className": "Porn", "probability": 0.0019817352294921875}, 
        //                {"className": "Sexy", "probability": 0.00046181678771972656}]

        const threshold = 0.2;
        // If any of the predictions are above the threshold, mark the image as unsafe
        const isUnsafe = predictions.some(prediction => 
            (prediction.className === "Porn" && prediction.probability > threshold) || 
            (prediction.className === "Hentai" && prediction.probability > threshold)||
            (prediction.className === "Sexy" && prediction.probability > threshold));

        if (isUnsafe) {   
            return "unsafe";
        }

        return downloadURL;
    } catch (error) {
        console.error("I know it only accepts JPEG right now... so don't say anything... ", error);
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
export async function updateListing(listingId, title, description, price, category, condition, image) {
    const listingRef = ref(database, `dorm_swap_shop/listings/${listingId}`);

    try {
        const snapshot = await get(listingRef);
        // Check if the listing exists
        const existingListingData = snapshot.val();

        if (!existingListingData) {
            console.error("Listing not found");
            return;
        }

        // Merge the new data with the existing data
        const updatedListingData = {
            ...existingListingData,
            title: title !== undefined ? title : existingListingData.title,
            description: description !== undefined ? description : existingListingData.description,
            price: price !== undefined ? price : existingListingData.price,
            category: category !== undefined ? category : existingListingData.category,
            condition: condition !== undefined ? condition : existingListingData.condition,
            images: image !== undefined ? image : existingListingData.image,
        };

        // Update the listing with the merged data
        await update(listingRef, updatedListingData);
        console.log("Listing information updated.");
    } catch (error) {
        console.error("Failed to update listing information: ", error);
    }
}

export async function getIndividualListing(listingId) {
    const userId = getUserID();
    const listingRef = ref(database, `dorm_swap_shop/listings/${listingId}`);
        
    // Check for ownership
    const snapshot = await get(listingRef);
    const listingData = snapshot.val();

    // Check if the listing belongs to the user
    if (listingData && listingData.user === userId) {
        // Return the listing
        return listingData;
    } else {
        console.error(`User ${userId} does not own listing ${listingId}.`);
    }
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