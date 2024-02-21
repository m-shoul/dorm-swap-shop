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
import { addMessage, readChat, createChatThread, getChatThreadId, getUsersInChat } from "../../backend/api/chat.js";
import { ref, push, set, get } from "firebase/database";
import { getUserID } from "../../backend/dbFunctions.js";
import { getUsernameByID } from "../../backend/api/user.js";

export default function Conversations() {
    const {chatId} = useLocalSearchParams();
    const [messages, setMessages] = useState([]);
    // const [chatId, setChatId] = useState("");
    const [yourUsername, setYourUsername] = useState("");
    const [theirUsername, setTheirUsername] = useState("");
    const yourID = getUserID();

    // This useEffect hook runs whenever chatId changes
    useEffect(() => {
        const fetchChatData = async () => {
            if (chatId) {
                const chatData = await readChat(chatId);
                // console.log("*Conversations* Chat data: ", chatData);
                if (chatData && chatData.participants) {
                    setMessages(chatData.messages);
                    const participants = chatData.participants;
                    setYourUsername(await getUsernameByID(yourID));
                    setTheirUsername(await getUsernameByID(participants.userId_1 === yourID ? participants.userId_2 : participants.userId_1));
                }
                else {
                    console.log("*Conversations* Chat data not found.");
                }
            }
        };
        fetchChatData();
    }, [chatId]); 


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
        <SafeAreaView style={{flex:1, backgroundColor: "#fff"}}>
            <View>
                <TouchableOpacity onPress={() => router.push("(home)/Chat")}>
                    <Text>&lt; Back</Text>
                </TouchableOpacity>
                <Text style={styles.chatHeader}>{theirUsername}</Text>
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