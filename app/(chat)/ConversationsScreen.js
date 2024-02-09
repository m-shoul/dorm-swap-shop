import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../(aux)/StyleSheet.js";
import { router, useLocalSearchParams } from "expo-router";
import { database } from "../../backend/config/firebaseConfig";
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { addMessage, readChat, createChatThread, getChatThreadId } from "../../backend/api/chat.js";
import { ref, push } from "firebase/database";
import { getUserID } from "../../backend/dbFunctions.js";
import { getUsernameByID } from "../../backend/api/user.js";

export default function Conversations() {
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState("");
    const [yourUsername, setYourUsername] = useState("");
    const [theirUsername, setTheirUsername] = useState("");
    const yourID = getUserID();
    const theirID = "otherUserIDPlaceholder";


    useEffect(() => {
        const fetchChatId = async () => {
            const id = await getChatThreadId(yourID, theirID);
            const yourUid = await getUsernameByID(yourID);
            const theirUid = await getUsernameByID(theirID);
            setYourUsername(yourUid);
            setTheirUsername(theirUid);

            console.log("*useEffect* Chat thread ID found: " + id);
            if (typeof (id) != "string" || !id) {
                console.log("*useEffect* Chat thread ID not found. Creating new chat thread.");
                const newId = await createChatThread(yourID, theirID);
                console.log("*useEffect* Chat thread ID created: " + newId);
                setChatId(newId);
            } else {
                setChatId(id);
            }
        };

        fetchChatId();
    }, []);

    useEffect(() => {
        if (chatId) {
            readChat(chatId).then(chatData => {
                setMessages(chatData.messages);
            });
        }
    }, [chatId]); // This useEffect hook runs whenever chatId changes


    //     // Test if the user id matches the current user id
    // useEffect(() => {
    //     messages.forEach(message => {
    //         if (message.user._id === yourID) {
    //             console.log('ID matches');
    //         } else {
    //             console.log('ID does not match: ' + message.user._id + ' ' + yourID);
    //         }
    //     });
    //     /////////////////////////
    // }, [messages]);


    const onSend = useCallback((messages = []) => {

        if (!chatId || typeof (chatId) != "string") {
            console.log("*onSend* Chat ID not found. Cannot send message.");
            return;
        }

        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )

        // Loop through all messages being sent
        for (let i = 0; i < messages.length; i++) {
            const { _id, text, user, createdAt } = messages[i];
            const messagesRef = ref(database, `dorm_swap_shop/chats/${chatId}/messages`);
            const newMessageReference = push(messagesRef);
            const messageData = {
                _id: newMessageReference.key,
                text,
                user,
                createdAt: createdAt.getTime(), // Convert date to timestamp
            };

            // Add the message to the Firebase database
            addMessage(chatId, messageData, newMessageReference);
        }
    }, [chatId])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View>
                <TouchableOpacity onPress={() => router.push("(home)/Home")}>
                    <Text>&lt; Home</Text>
                </TouchableOpacity>
                <Text style={styles.chatHeader}>Name</Text>
            </View>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: yourID,
                    name: yourUsername,
                }}
            />
        </SafeAreaView>
    )
}