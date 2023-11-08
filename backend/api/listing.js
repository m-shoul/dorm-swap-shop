import { database } from '../config/firebaseConfig';
import { get, child, ref, set, push, getDatabase } from 'firebase/database';
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { readData } from '../dbFunctions';
import React, { useState, useEffect } from "react";
import { categories, statuses, conditions } from '../../src/components/Enums.js';

// ^^ Import whatever we need for this...
// NOTE************ add additional parameters when needed!!! This is just a baseline.

// Get a reference to the storage database
const storage = getStorage();

// Function to create a new listing
// https://firebase.google.com/docs/database/web/read-and-write
// Post and simultaneously update it to the recent activity feed and the posting user's activity feed.

// Old version - delete if new one works
// export function createListing(title, description, price, userId, image) {

//     // Reference listings in database
//     const listingReference = ref(database, 'dorm_swap_shop/listings/');

//     // Generates a unique ID
//     const newListingReference = push(listingReference);

//     // Gets the unique ID
//     const listingId = newListingReference.key;

//     // Gets image reference
//     const imagesRef = ref(getDatabase(), `/dorm_swap_shop/listings/${listingId}/images`);

//     if (image) {    
//         // uploadImage(image, dbRef);
//         uploadImageAsync(image, imagesRef);
//     } else {
//         console.log("No image set");
//     }

//     const listingData = {
//         title: title,
//         description: description,
//         price: price,
//         userId: userId,
//         images: [],
//         // timeUpload: firebase.database.ServerValue.TIMESTAMP
//         timeUpload: new Date().toISOString()
//     };

//     set(newListingReference, listingData);

//     return listingId;
// }


export async function createListing(userId, title, description, price, category, condition, location, image) {
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
    if (image) {
        const imagesRef = ref(database, `dorm_swap_shop/listings/${listingId}/images`);
        await uploadImageAsync(image, imagesRef);
    }

    return listingId;
}



// Function to read user data
export function readListing(listingId) {
    // Implement the functionality to read a listing.
    // I think this will be used for displaying the listings in the
    // home page and then displaying the listings in the user profile.
    readData("dorm-swap-shop/listings/"+listingId);
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

async function uploadImageAsync(uri, imagesRef) {
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

    // We're done with the blob, close and release it
    blob.close();

    const downloadURL = await getDownloadURL(storageRef);
    console.log(downloadURL);

    // const imagesRef = ref(images, "images/");
    console.log(imagesRef);
    // const newImageRef = push(imagesRef);
    await set(imagesRef, downloadURL);

    return downloadURL;
}
