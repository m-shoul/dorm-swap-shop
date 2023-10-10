import { database } from '../config/firebaseConfig';
import { get, child, ref, set, push, getDatabase } from 'firebase/database';

// ^^ Import whatever we need for this...
// NOTE************ add additional parameters when needed!!! This is just a baseline.

// Function to create a new user
export function createListing(listingData) {
    // Implement the functionality to create a listing in the db.
    // I think we already have this somewhere it just needs to be
    // put in here for better organization.

    // https://firebase.google.com/docs/database/web/read-and-write
    // Post and simultaneously update it to the recent activity feed and the posting user's activity feed.
}

// Function to read user data
export function readListing(listingId) {
    // Implement the functionality to read a listing.
    // I think this will be used for displaying the listings in the
    // home page and then displaying the listings in the user profile.
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
