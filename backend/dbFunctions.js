import { database, auth } from './config/firebaseConfig';
import { get, child, ref } from 'firebase/database';
import { signOut } from "firebase/auth";

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





