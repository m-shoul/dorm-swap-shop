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
export function writeUserData(fname, lname, uname, email, password) {

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
        // password: password   //--> Revisit this tomorrow. Should we even keep this
                                // if firebase auth handles and hashes the passwords anyway??
                                // I think it would be stupid to waste time trying to implement
                                // changing the password in the realtime if auth already takes
                                // care of it on that end...
        // profile_picture : imageUrl
    };

    set(newUserReference, userData);

    return userId;
}