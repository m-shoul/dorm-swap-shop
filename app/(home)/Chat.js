import { Text, View, TouchableWithoutFeedback, TouchableOpacity, 
        SafeAreaView, Animated, /*Image,*/ } from "react-native";
import { Image } from "expo-image";
import React, { useState, useEffect, useRef } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import TrashButtonComponent from "../../assets/svg/trash_button";
import ReportComponent from "../../assets/svg/report_icon";
import SearchBarHeader from "../../components/SearchBar";
import { router } from "expo-router";
import { getChatsByUser, readChat } from "../../backend/api/chat.js";
import SquareHeader from "../../components/SquareHeader.js";
import { getUsernameByID } from "../../backend/api/user.js";
import { getUserID } from "../../backend/dbFunctions.js";

//import styles from "../styleSheets/StyleSheet.js";
//import { HeaderComponent } from "../components/headerComponent.js";

export default function ChatScreen() {
    const [chatThreads, setChatThreads] = useState([]);
    const [readableChatThreads, setReadableChatThreads] = useState([]);
    useEffect(() => {
        // This will be used to retrieve the chat threads for the user.
        // The chat threads will be retrieved from the database.
        // The chat threads will be displayed in the SwipeListView.
        getChatsByUser(getUserID()).then((chatThreads) => {
            setChatThreads(chatThreads);
        });
        // console.log("*starting useEffect* Chat threads: ", chatThreads);

    }, []);

    useEffect(() => {
        const fetchChatThreads = async () => {
            const chatThreadsPromises = chatThreads.map(async (chatData) => {
                let otherUser = chatData.participants.userId_1 === getUserID() 
                    ? chatData.participants.userId_2 
                    : chatData.participants.userId_1;
    
                const otherUsername = await getUsernameByID(otherUser);
                let messageList = [];
                let message = "";
    
                if (chatData && 'messages' in chatData) {
                    messageList = await readChat(chatData.chatId);
                    if (messageList.length > 0) {
                        message = messageList[messageList.length-1].text;
                        // console.log("*chatThreads update useEffect* Most recent message: " + message);
                    }
                    else {
                        console.log("*chatThreads update useEffect* Chat thread has no messages.");
                    }
                }
                else {
                    console.log("*chatThreads update useEffect* Chat thread is missing messages attribute.");
                }
                    
                return {
                    readableChatId: chatData.chatId,
                    images: "https://reactnative.dev/img/tiny_logo.png",
                    name: otherUsername,
                    message: message,
                };
            });
    
            const chatObjects = await Promise.all(chatThreadsPromises);
            setReadableChatThreads(chatObjects);
        };
    
        fetchChatThreads();
    }, [chatThreads]);


    const scrollOffsetY = useRef(new Animated.Value(0)).current;
    const handleSearch = () => {
        null;
    };

    // const [selectedChat, setSelectedChat] = useState("");
    // const [search, setSearch] = useState("");
    

    async function handleItemPress(chat) {
        // console.log("*ChatScreen* Selected chat: ", chat.readableChatId);
        router.push({pathname: "ConversationsScreen", params: {chatId: chat.readableChatId}} );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F7F7" }}>
            <SquareHeader height={"8%"} />
            <View style={{ backgroundColor: "#112D4E", paddingHorizontal: "2%" }}>
                <SearchBarHeader
                    animHeaderValue={scrollOffsetY}
                    handleSearch={handleSearch}
                />
            </View>
            {/* Scrollable view displaying all the chat messages */}

            <SwipeListView
                data={Object.values(readableChatThreads)}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback
                        style={{ width: "100%" }}
                        onPress={() => handleItemPress(item)}
                        key={item.readableChatId}>
                        <View>
                            <View
                                style={{
                                    backgroundColor: "white",
                                    flexDirection: "row",
                                    flex: 1,
                                    marginLeft: "3%",
                                    marginRight: "3%",
                                    marginTop: "1%",
                                    height: 100,
                                }}>
                                {/* Source might be something like source={{uri: item.images}} */}
                                <Image
                                    source={{ uri: item.images }}
                                    style={{ width: "30%", height: "100%" }}
                                />
                                <View
                                    style={{
                                        justifyContent: "center",
                                        paddingLeft: "5%",
                                    }}>
                                    {/* <Text style={{ fontWeight: "bold" }}>{"$" + item.price + " - " + item.title}</Text> */}
                                    <Text style={{ fontWeight: "bold" }}>
                                        {typeof item.name === "string" ? item.name : "Name is not a string"}
                                    </Text>
                                    <Text>{typeof item.message === "string" ? item.message : "Message is not a string"}</Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    backgroundColor: "#B3B3B3",
                                    height: 1,
                                    marginBottom: "5%",
                                    marginLeft: "7%",
                                    marginRight: "7%",
                                }}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                )}
                renderHiddenItem={({ item }) => (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginBottom: "6%",
                            marginTop: "1%",
                            marginRight: "4%",
                        }}>
                        <TouchableOpacity
                            style={{
                                width: 75,
                                backgroundColor: "#FF9900",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => {
                                // Handle the "Report" action
                                router.push({
                                    pathname: "ReportScreen",
                                    params: { image: item.images },
                                });
                            }}>
                            <ReportComponent width="50%" height="50%" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 75,
                                backgroundColor: "#F30000",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => {
                                // Handle the "Delete" action
                                alert("Chat will be deleted");
                            }}>
                            <TrashButtonComponent width="40%" height="40%" />
                        </TouchableOpacity>
                    </View>
                )}
                disableRightSwipe={true}
                rightOpenValue={-150}
                keyExtractor={(item) => item.readableChatId}
                style={{
                    flex: 1,
                    backgroundColor: "#F9F7F7",
                    paddingTop: "15%",
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                    { useNativeDriver: false }
                )}
                bounces={false}
            />
        </SafeAreaView>
    );
}
