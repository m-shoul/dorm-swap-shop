import { database } from '../config/firebaseConfig';
import { get, ref, set, push } from 'firebase/database';
import { getUsernameByID, addChatThreadToUser, getUserPushIdFromFirebaseRealtime } from './user';

// Function to create a new chat thread
export async function createChatThread(userId_1, userId_2) {

    const chatReference = ref(database, 'dorm_swap_shop/chats');
    const snapshot = await get(chatReference);
    let chatData = snapshot.val();

    for (let chatId in chatData) {
        if( (chatData[chatId].participants.userId_1 === userId_1 && chatData[chatId].participants.userId_2 === userId_2) ||
            (chatData[chatId].participants.userId_1 === userId_2 && chatData[chatId].participants.userId_2 === userId_1)   )
        {
            console.log("*API - createChatThread* Chat already exists: " + chatId);
            return chatId;
        }
    }

    const newChatReference = push(chatReference);

    const chatId = newChatReference.key;
    // console.log("*API - createChatThread* Chat ID created: " + chatId);
    // console.log("*API - createChatThread* User 1: " + userId_1);
    // console.log("*API - createChatThread* User 2: " + userId_2);

    const participants = {
        userId_1: userId_1,
        userId_2: userId_2
    };

    const newChatData = {
        chatId: chatId,
        participants: participants,
        reported: false, 
        messages: []
    };

    await set(newChatReference, newChatData); 

    await addChatThreadToUser(userId_1, chatId);
    await addChatThreadToUser(userId_2, chatId);

    console.log("*API - createChatThread* Chat created with id: " + chatId);
    

    return chatId;
}

// Function to get chat thread ID from two user IDs
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
                        // console.log("*API - getChatThreadId* Chat thread ID found: " + chatId);
                        return chatId;
                    }
                }
            }
        }
        else
        {
            console.log("*API - getChatThreadId* No chat threads found.");
        }
        console.log("*API - getChatThreadId* Chat thread ID not found.");
        return null;
    } catch (error) {
        console.error('*API - getChatThreadId* Error retrieving chat thread ID:', error);
        throw error;
    }
}

// Function to get chat data from a chat ID
export async function getChatData(chatId) {
    try {
        const chatReference = ref(database, `dorm_swap_shop/chats/${chatId}`);
        const snapshot = await get(chatReference);

        if (snapshot.exists()) {
            const chatData = snapshot.val();
            console.log("*API - getChatData* Chat data found");
            console.log("*API - getChatData* participants: " + chatData.participants.userId_1 + " " + chatData.participants.userId_2);
            return chatData;
        }
        console.log("*API - getChatData* Chat data not found.");
        return null;
    } catch (error) {
        console.error('*API - getChatData* Error retrieving chat data:', error);
        throw error;
    }
}

//get all chat threads for a user
export async function getChatsByUserWithHidden(userId) {
    try {
        const chatReference = ref(database, 'dorm_swap_shop/chats');
        const snapshot = await get(chatReference);

        if (snapshot.exists()) {
            const chats = snapshot.val();
            let chatThreads = [];

            for (let chatId in chats) {
                if (!chats[chatId]) {
                    console.log("*API - getChatsByUserWithHidden* No chat found for chatId: " + chatId);
                    continue;
                }
                
                console.log("*API - getChatsByUser* chatId: " + chatId);

                const participants = chats[chatId].participants;
                if (!participants) {
                    console.log("*API - getChatsByUserWithHidden* No participants found for chat: " + chatId);
                    continue;
                }

                if (participants.userId_1 === userId || participants.userId_2 === userId) {
                    chatThreads.push(chats[chatId]);
                    console.log("*API - getChatsByUserWithHidden* Chat found for current user: " + chatId + 
                                " with other user: " + (participants.userId_1 === userId ? participants.userId_2 : participants.userId_1));
                } 
                else {
                    console.log("*API - getChatsByUserWithHidden* Chat found without current user ");
                }
            }

            console.log("*API - getChatsByUserWithHidden* Chat threads found: " + chatThreads);
            return chatThreads;
        }
        console.log("*API - getChatsByUserWithHidden* No chat threads found.");
        return null;
    } catch (error) {
        console.error('*API - getChatsByUserWithHidden* Error retrieving chat threads:', error);
        throw error;
    }
}

//get all visible chat threads for a user
export async function getChatsByUser(userId) {
    try {
        let databaseUserId = await getUserPushIdFromFirebaseRealtime(userId);
        const chatReference = ref(database, 'dorm_swap_shop/chats');
        const userReference = ref(database, `dorm_swap_shop/users/${databaseUserId}/private/chats`);
        const snapshot = await get(chatReference);
        const userSnapshot = await get(userReference);

        console.log("*API - getChatsByUser* snapshot exists: " + snapshot.exists());
        console.log("*API - getChatsByUser* userSnapshot exists: " + userSnapshot.exists());
        
        if (snapshot.exists() && userSnapshot.exists()) {
            const chats = snapshot.val();
            const userChats = userSnapshot.val();
            let chatThreads = [];

            for (let chatId in chats) {
                let chatInUserList = false;
                for (let userChatId of userChats) {
                    console.log("*API - getChatsByUser* User chat: " + userChatId);
                    console.log("*API - getChatsByUser* Chat: " + chatId);
                    if (chatId === userChatId) {
                        chatInUserList = true;
                        break;
                    }
                }

                if (!chatInUserList) {
                    console.log("*API - getChatsByUser* Chat not found in user list: " + chatId);
                    continue;
                }

                if (!chats[chatId]) {
                    console.log("*API - getChatsByUser* No chat found for chatId: " + chatId);
                    continue;
                }
                
                console.log("*API - getChatsByUser* chatId: " + chatId);

                const participants = chats[chatId].participants;
                if (!participants) {
                    console.log("*API - getChatsByUser* No participants found for chat: " + chatId);
                    continue;
                }

                if (participants.userId_1 === userId || participants.userId_2 === userId) {
                    chatThreads.push(chats[chatId]);
                    console.log("*API - getChatsByUser* Chat found for current user: " + chatId + 
                                " with other user: " + (participants.userId_1 === userId ? participants.userId_2 : participants.userId_1));
                } 
                else {
                    console.log("*API - getChatsByUser* Chat found without current user ");
                }
            }

            console.log("*API - getChatsByUser* Chat threads found: " + chatThreads);
            return chatThreads;
        }
        console.log("*API - getChatsByUser* No chat threads found.");
        return null;
    } catch (error) {
        console.error('*API - getChatsByUser* Error retrieving chat threads:', error);
        throw error;
    }
}

// export async function getUsersInChat(chatId) {
//     try {
//         const chatReference = ref(database, `dorm_swap_shop/chats/${chatId}`);
//         const snapshot = await get(chatReference);

//         if (snapshot.exists()) {
//             const chatData = snapshot.val();
//             const participants = chatData.participants;
//             console.log("*API - getUsersInChat* Participants found: " + participants.userId_1 + " " + participants.userId_2);
//             return participants;
//         }
//         console.log("*API - getUsersInChat* Participants not found.");
//         return null;
//     } catch (error) {
//         console.error('*API - getUsersInChat* Error retrieving participants:', error);
//         throw error;
//     }
// }

export async function addMessage(chatId, messageData, messageReference) {
    try {
        if (typeof(chatId) != "string" || !chatId) {
            throw new Error('Chat ID is required.');
        }
        const chatRef = ref(database, `dorm_swap_shop/chats/${chatId}`);
        const snapshot = await get(chatRef);

        if (!snapshot.exists()) {
            throw new Error('Chat does not exist.');
        }

        await set(messageReference, messageData);

        const threadData = snapshot.val();
        const user1 = threadData.participants.userId_1;
        const user2 = threadData.participants.userId_2;

        await addChatThreadToUser(user1, chatId);
        await addChatThreadToUser(user2, chatId);
        // console.log("Message added to chat: " + chatId + ": " + messageData.text);

        return messageReference.key;
    } catch (error) {
        console.error('Error adding message:', error);
        throw error;
    }
}

// Function to read chat data and return the messages and participants
export async function readChat(chatId) {
    // console.log("*API - readChat* Reading chat: " + chatId);

    const chatRef = ref(database, `dorm_swap_shop/chats/${chatId}`);
    
    // Return the Promise created by get(chatRef).then(...)
    return get(chatRef).then((snapshot) => {
        if (snapshot.exists()) {
            const chatData = snapshot.val();
            const participants = chatData.participants;
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

            // console.log("*API - readChat* Messages found: " + messages);

            // Return the messages
            return { messages: messages.reverse(), participants: participants};
        } else {
            throw new Error('*API - readChat* Chat does not exist.');
        }
    }).catch((error) => {
        console.error('*API - readChat* Error reading chat:', error);
        throw error;
    });
}


// Function to update a chat
export function updateChat(chatId, chatData) {
    // We might not actually need this... I just had it here for CRUD consistency.
}

// Function to delete a chat
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