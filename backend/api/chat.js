import { database } from '../config/firebaseConfig';
import { get, child, ref, set, push } from 'firebase/database';
import { getUsernameByID } from './user';

// Function to create a new user
export async function createChatThread(userId_1, userId_2) {
    // The "Reply", button will most likely call this method and then
    // navigate to the chat screen.

    const chatReference = ref(database, 'dorm_swap_shop/chats');

    const newChatReference = push(chatReference);

    const chatId = newChatReference.key;
    console.log("*API - createChatThread* Chat ID created: " + chatId);
    console.log("*API - createChatThread* User 1: " + userId_1);
    console.log("*API - createChatThread* User 2: " + userId_2);

    const participants = {
        userId_1: userId_1,
        userId_2: userId_2
    };

    const chatData = {
        chatId: chatId,
        participants: participants,
        reported: false, 
        messages: []
    };

    await set(newChatReference, chatData); 

    console.log("*API - createChatThread* Chat created with id: " + chatId);

    return chatId;
}

export async function getChatThreadId(uid1, uid2) {
    try {
        const chatReference = ref(database, 'dorm_swap_shop/chats');
        const snapshot = await get(chatReference);

        if (snapshot.exists()) {
            const chats = snapshot.val();
            for (const chatId in chats) {
                if (chats[chatId]) {
                    const participants = chats[chatId].participants;
                    if (participants && participants.userId_1 === uid1 && participants.userId_2 === uid2) {
                        console.log("*API - getChatThreadId* Chat thread ID found: " + chatId);
                        return chatId;
                    }
                }
            }
        }
        console.log("*API - getChatThreadId* Chat thread ID not found.");
        return null;
    } catch (error) {
        console.error('*API - getChatThreadId* Error retrieving chat thread ID:', error);
        throw error;
    }
}

export async function addMessage(chatId, messageData, messageReference) {
    try {
        if (typeof(chatId) != "string" || !chatId) {
            throw new Error('Chat ID is required.');
        }
        const chatRef = ref(database, `dorm_swap_shop/chats/${chatId}`);
        const snapshot = await get(chatRef);

        if (!snapshot.exists()) {
            // await createChatThread(userId, userId_2);
            throw new Error('Chat does not exist.');
        }

        // const messagesRef = ref(database, `dorm_swap_shop/chats/${chatId}/messages`);
        // const newMessageReference = push(messagesRef);

        // const messageData = {
        //     id: newMessageReference.key,
        //     message: message,
        //     timestamp: new Date().toISOString(),
        //     user: {_id: userId, name: getUsernameByID(userId)}
        // };

        await set(messageReference, messageData);

        console.log("Message added to chat: " + chatId + ": " + messageData.text);

        return messageReference.key;
    } catch (error) {
        console.error('Error adding message:', error);
        throw error;
    }
}

// Function to read user data
export async function readChat(chatId) {
    console.log("*API - readChat* Reading chat: " + chatId);

    const chatRef = ref(database, `dorm_swap_shop/chats/${chatId}`);
    
    // Return the Promise created by get(chatRef).then(...)
    return get(chatRef).then((snapshot) => {
        if (snapshot.exists()) {
            const chatData = snapshot.val();
            // const participants = chatData.participants;
            const messages = [];

            // Loop through the messages and add them to the messages array
            for (const messageId in chatData.messages) {
                const message = chatData.messages[messageId];
                let userId = message.user._id;
                let name = getUsernameByID(userId);
                if (typeof(name) != "string") {
                    name = "Unknown";
                }
                messages.push({
                    _id: message._id,
                    text: message.text,
                    createdAt: new Date(message.createdAt),
                    user: 
                    {
                        _id: userId,
                        name: name
                    }
                });
            }

            // Return the messages
            return { messages: messages.reverse() };
        } else {
            throw new Error('*API - readChat* Chat does not exist.');
        }
    }).catch((error) => {
        console.error('*API - readChat* Error reading chat:', error);
        throw error;
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