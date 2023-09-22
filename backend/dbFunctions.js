import { database, auth } from '../backend/config/firebaseConfig';
import { get, child, ref, set } from 'firebase/database';
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
export default function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            console.log('Got user: ', user);
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        })
        return unsub;
    },[])
    return { user }
}

// Write user data to the database.
export function writeUserData(userId, fname, lname, uname, email, password) {
    set(ref(database, 'dorm_swap_shop/users/' + userId), {
        fname:fname,
        lname:lname,
        username: uname,
        email: email,
        password: password
        // profile_picture : imageUrl
    });
}