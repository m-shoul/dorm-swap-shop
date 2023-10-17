import { database } from '../config/firebaseConfig';
import { get, child, ref, set, push, getDatabase } from 'firebase/database';

// ^^ Import whatever we need for this...
// NOTE************ add additional parameters when needed!!! This is just a baseline.

// Function to create a new user
export function createUser(fname, lname, uname, email) {

    // Reference users in database
    const userReference = ref(database, 'dorm_swap_shop/users/');

    // Generates a unique ID
    const newUserReference = push(userReference);

    // Gets the unique ID
    const userId = newUserReference.key;

    const userData = {
        fname: fname,
        lname: lname,
        username: uname,
        email: email,
        // profile_picture : imageUrl
    };

    set(newUserReference, userData);

    return userId;
}

// Function to read user data
export function readUser(userId) {
    // Implement the functionality to read user data.
    // This will be used in displaying the profile page and whatnot.
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
