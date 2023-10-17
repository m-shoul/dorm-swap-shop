import { database } from '../config/firebaseConfig';
import { get, child, ref, set, push, getDatabase } from 'firebase/database';
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { readData } from '../dbFunctions';

// ^^ Import whatever we need for this...
// NOTE************ add additional parameters when needed!!! This is just a baseline.

// Get a reference to the storage database
const storage = getStorage();

// Function to create a new listing
// https://firebase.google.com/docs/database/web/read-and-write
// Post and simultaneously update it to the recent activity feed and the posting user's activity feed.
export function createListing(title, description, price, userId, image) {

    // Reference listings in database
    const listingReference = ref(database, 'dorm_swap_shop/listings/');

    // Generates a unique ID
    const newListingReference = push(listingReference);

    // Gets the unique ID
    const listingId = newListingReference.key;

    // Gets image reference
    const dbRef = ref(getDatabase(), "/dorm_swap_shop/listings/" + listingId + "/images");

    const listingData = {
        title: title,
        description: description,
        price: price,
        userId: userId,
        // timeUpload: firebase.database.ServerValue.TIMESTAMP
        timeUpload: new Date().toISOString()
    };

    set(newListingReference, listingData);

    if (image) {
        uploadImage(image, dbRef);
    } else {
        console.log("No image set");
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

// Function to upload image to the database.
const uploadImage = async (uri, dbRef) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = sRef(storage, "test/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setProgress(progress.toFixed());
        },
        (error) => {
            // handle error
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log("File available at", downloadURL);
                // save record
                const newRecordRef = push(dbRef);
                await set(newRecordRef, {
                    image: downloadURL,
                    timestamp: new Date().toISOString(),
                });
                // setImage("");
            });
        }
    );
    // Testing purposes
    alert("Image uploaded");        
};
