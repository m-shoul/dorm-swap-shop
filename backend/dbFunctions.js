import { database, auth } from '../backend/config/firebaseConfig';
import { get, child, ref, set, push } from 'firebase/database';
import firebase from "firebase/app";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';

// Read data from database
export async function readData(path) {
    return await get(child(ref(database), path))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

// Use Firebase Authentication
// probably dont need this eventually....
// export default function useAuth() {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const unsub = onAuthStateChanged(auth, user => {
//             console.log('Got user: ', user);
//             if (user) {
//                 setUser(user);
//             } else {
//                 setUser(null);
//             }
//         })
//         return unsub;
//     },[])
//     return { user }
// }

// Write user data to the database.
export function writeUserData(fname, lname, uname, email) {

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

// Write post data to the database.
export function writeListingData(title, description, price, userId) {

    // Reference listings in database
    const listingReference = ref(database, 'dorm_swap_shop/listings/');

    // Generates a unique ID
    const newListingReference = push(listingReference);

    // Gets the unique ID
    const listingId = newListingReference.key;

    const listingData = {
        title: title,
        description: description,
        price: price,
        userId: userId,
        // timeUpload: firebase.database.ServerValue.TIMESTAMP
        timeUpload: Date.now()
    };

    set(newListingReference, listingData);

    return listingId;
}

