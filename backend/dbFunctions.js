import { auth } from './config/firebaseConfig';
import { signOut } from "firebase/auth";

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