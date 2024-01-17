import { database } from '../config/firebaseConfig.js';
import { get, child, ref, set, push, getDatabase } from 'firebase/database';

// Function to create a new user
export async function createChatThread(userId_1, userId_2) {
    // The "Reply", button will most likely call this method and then
    // navigate to the chat screen.

    const chatReference = ref(database, 'dorm_swap_shop/chats');

    const newChatReference = push(chatReference);

    const chatId = newChatReference.key;

    const chatData = {
        chatId: chatId,
        participants: {
            [userId_1]: {
                messages: []
            },
            [userId_2]: {
                messages: []
            }
        },
        reported: false
    };

    await set(newChatReference, chatData); 

    console.log("Chat created with id: " + chatId);

    return chatId;
}

export async function addMessage(chatId, userId, message) {
    try {
        const chatRef = ref(database, `dorm_swap_shop/chats/${chatId}`);
        const snapshot = await get(chatRef);

        if (!snapshot.exists()) {
            // await createChatThread(userId, userId_2);
            throw new Error('Chat does not exist.');
        }

        const messageData = {
            message: message,
            timestamp: new Date().toISOString(),
        };

        const messagesRef = ref(database, `dorm_swap_shop/chats/${chatId}/participants/${userId}/messages`);
        const newMessageReference = push(messagesRef);

        await set(newMessageReference, messageData);

        console.log("Message added to chat: " + chatId + ": " + message);

        return newMessageReference.key;
    } catch (error) {
        console.error('Error adding message:', error);
        throw error;
    }
}

// Function to read user data
export function readChat(chatId) {
    // !!!! This function is untested !!!!

    const chatRef = ref(database, `dorm_swap_shop/chats/${chatId}`);
    
    // Read the chat data from the database
    get(chatRef).then((snapshot) => {
        if (snapshot.exists()) {
            const chatData = snapshot.val();
            const participants = chatData.participants;
            
            // Loop through the participants and their messages
            for (const userId in participants) {
                const messages = participants[userId].messages;
                
                // Loop through the messages and display them
                for (const message of messages) {
                    console.log(`User ${userId} sent a message: ${message.message}`);
                }
            }
        } else {
            console.log('Chat does not exist.');
        }
    }).catch((error) => {
        console.error('Error reading chat:', error);
    });
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