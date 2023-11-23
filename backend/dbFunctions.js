import { database, auth } from './config/firebaseConfig';
import { get, child, ref, set, push, getDatabase, firebaseAuth } from 'firebase/database';
import firebase from "firebase/app";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useEffect } from 'react';

//May be able to delete this file and just use the api files

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
// export default function useAuth() {yy
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

export const getUserID = () => {
    var uid = "User ID not found";
    var user = auth.currentUser;
    if (user != null) {
        uid = user.uid;
    }

    return uid;
}

export const logoutUser = () => {
    signOut(auth)
}





