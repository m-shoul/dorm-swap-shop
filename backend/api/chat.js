import { database } from '../config/firebaseConfig';
import { get, child, ref, set, push, getDatabase } from 'firebase/database';

// ^^ Import whatever we need for this...
// NOTE************ add additional parameters when needed!!! This is just a baseline.

// Function to create a new user
export function createChat(chatData) {
    // Implement the functionality to create a chat between users in the db.
    // Think about this and how EACH user will have a different list of
    // chats depending on who they reply to.

    // The "Reply", button will most likely call this method and then
    // navigate to the chat screen.
}

// Function to read user data
export function readChat(chatId) {
    // Implement the functionality to display chats.
    // we can change the name but for CRUD purposes I just had it readChat.
}

// Function to update a user
export function updateChat(chatId, chatData) {
    // We might not actually need this... I just had it here for CRUD consistency.
}

// Function to delete a user
export function deleteChat(chatId) {
    // Implement the functionality to delete a chat. 
    // This will be used when a user wants to delete a chat.
    // But we need to remember that if the user deletes a chat, it only deletes
    // from THEIR account. so the one that is tied to the specific User id from the
    // current user.

    // Now we also want the chat between both users to delete after a certain
    // amount of time to save storage in the database. This might be a separate
    // function hmm... think about this.
}


// Can add additional functions in here that deal with the listings
// and curtail them to our needs.