import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../(aux)/StyleSheet.js";
import { router, useLocalSearchParams } from "expo-router";
import { database } from "../../backend/config/firebaseConfig";
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { addMessage, readChat, createChatThread, getChatThreadId, getUsersInChat } from "../../backend/api/chat.js";
import { ref, push, set, get } from "firebase/database";
import { getUserID } from "../../backend/dbFunctions.js";
import { getUsernameByID, getUserProfileImage } from "../../backend/api/user.js";
import SquareHeader from "../../components/SquareHeader.js";
import { Ionicons } from '@expo/vector-icons';
import { useStore } from "../global.js";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Conversations() {
    const { chatId } = useLocalSearchParams();
    const [messages, setMessages] = useState([]);
    // const [chatId, setChatId] = useState("");
    const [yourUsername, setYourUsername] = useState("");
    const [theirUsername, setTheirUsername] = useState("");
    const [theirProfileImage, setTheirProfileImage] = useState("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAtgMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQUGBAMCB//EADUQAQACAQIDBAYJBQEAAAAAAAABAgMEEQUhMRJBUWEVU3GSscETIiMyNEJic6FDUoGR0RT/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAFxEBAQEBAAAAAAAAAAAAAAAAAAERMf/aAAwDAQACEQMRAD8A/RAHRkAAAAAA7n1jpfLO2OlrT5Q6uHaG2otN78sUfyvcWKmKnZx1iseUM2qo6cL1N43mK08rSmeE6mOk0n2SvjZNqszm0ufDG+THO3jDxauYiYmJjePBW8R4dWazkwV2tHWseCyophKGgAEAAAAAAAAAAAAHrpsU589MfPnLxlacDpvkyZJj7vKEqrbDiripFKRtWHoDCogSgA7kgKDiumjDm+kp92/xcLQ8Vxxk0V+W815xszzUqAhLSAAAAAAAAAAAAC74J+FtPjdSSuuBzH/mtXvi+7NVZJQllQAAAHlnjfDeP0yy8dGo1Fopgva08orLLx0WIbiJS2gAAAAAAAAAAAAsODZYpntjmdu3HL2q9NbTS9b161neEqtWlz6PU11OKLRMdrvjwl0MKAAA+b2itJtaYiI5yDi4xlimktTfnedtlBHLk6tdqZ1Obt/l22rDmakQAaQAAAAAAAAAAAAAB76XU30uXt022nrC/wBPqsWevapePYzJzjnE7MYrWjNY9fqccdmuWdvPm+r8R1Vo2+k29kGK0GTJTHEze0RHnKl4jr/p/ssU7Y46z3zLgte17Ta9ptae+Ud6yIANIAAAAAAAAAAAAEprWbTERvMz0iFtouFxERfU85/tS1VXiw5c0xGKkzMu2nCc887WpXyld0pXHG1KxEeT6Z0xTehr+ur7p6Gv6+vurkTVUvoS/r6+6ehcnr6+6ug0UvoW/r6+6ehskf16+6ug0UVuEaiOlsc/5n/jmy6PUYY3vjnbxjm0wupjJb7fNLSajSYdRH2mOO13WjqpNbocmlnefrY+60fNqUcoCoAAAAAAJrE2tFYjeZ6QhZcG03byTntH1Y+77UtV2cP0NMFIvkjfL8HejZLCgAAAAAAAAAD5vSt6zW9YtE90voBnNfo50mX6u847fdn5OVptXp41GC2O3XrE+Es1NZraa2jaY5S1KiAGkAAAATWJtaK1jeZ5Q1GnxRhw0xx+WNlBwysW12KJ6RvP+oaNitACAAAAAAAAAAAACJ6KDjFPo9ZMxHK8btApuPV+0w28YmFnSqsBtkAAAB38GjfW+ykz8F8ouCfjLftz8YXrF60AIAAAAAAAAAAAACp490wT52+S2VXH4+zwz+qY/hZ0U4DaAAgADv4J+Nn9ufjC+Bi9aAEAAAAAAAAAAAAER1V3HfwuP9z5SCwUkANoACP/2Q==");
    const [setGlobalReload] = useStore((state) => [state.setGlobalReload]);
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
                    setTheirProfileImage(await getUserProfileImage(participants.userId_1 === yourID ? participants.userId_2 : participants.userId_1));
                }
                else {
                    console.log("*Conversations* Chat data not found.");
                }
            }
        };
        fetchChatData();
    }, [chatId, messages]);


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

    const renderAvatar = () => (
        <Image source={{ uri: theirProfileImage }} style={{ width: 35, height: 35, borderRadius: 200 }} />
    );

    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: styles.colors.lightColor, paddingBottom: 25 }}>
            <StatusBar barStyle={"light-content"} />
            <SquareHeader height={80} />
            <View
                style={{
                    flexDirection: "row",
                    paddingHorizontal: "5%",
                    width: "100%",
                    justifyContent: "center",
                    backgroundColor: styles.colors.darkColor,
                    height: 68
                }}>
                <TouchableOpacity
                    onPress={() => { router.push("(home)/Chat"), setGlobalReload(true) }}
                    style={{ marginLeft: "-6.5%" }}>
                    <Ionicons name="chevron-back" size={32} color="white" />
                </TouchableOpacity>

                <View style={{ alignItems: "center", width: "80%" }}>
                    <Text
                        style={[styles.postListingHeader, { color: styles.colors.lightColor }]}>
                        {theirUsername}
                    </Text>
                </View>
            </View>
            <GiftedChat
                renderAvatar={renderAvatar}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: yourID,
                    name: yourUsername,
                    avatar: "../../assets/logos/logoV2.png"
                }}
                renderInputToolbar={(props) => (
                    <InputToolbar
                        {...props}
                        containerStyle={{
                            backgroundColor: "#F5F5F5",
                            paddingHorizontal: 12,
                        }}
                        textInputStyle={{
                            color: "black",
                            backgroundColor: "white",
                            borderRadius: 10,
                            paddingHorizontal: 12,
                            marginTop: 8,
                            marginBottom: 0
                        }}
                    />
                )}

            />
        </View>
    )
}