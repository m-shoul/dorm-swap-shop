import {
    Text, View, TouchableWithoutFeedback, TouchableOpacity,
    SafeAreaView, Animated, RefreshControl,/*Image,*/
} from "react-native";
import { Image } from "expo-image";
import React, { useState, useEffect, useRef } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import SearchBarHeader from "../../components/SearchBar";
import { router } from "expo-router";
import { getChatsByUser, readChat } from "../../backend/api/chat.js";
import SquareHeader from "../../components/SquareHeader.js";
import { getUserProfileImage, getUsernameByID } from "../../backend/api/user.js";
import { getUserID } from "../../backend/dbFunctions.js";
import styles from "../(aux)/StyleSheet.js";
import { Ionicons } from "@expo/vector-icons";
// import { HeaderComponent } from "../components/headerComponent.js";

export default function ChatScreen() {
    const [chatThreads, setChatThreads] = useState([]);
    const [readableChatThreads, setReadableChatThreads] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        // setRefreshing(true);
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
                const otherProfileImage = await getUserProfileImage(otherUser);
                let messageList = [];
                let message = "";

                if (chatData && 'messages' in chatData) {
                    messageList = await readChat(chatData.chatId);
                    if (messageList.length > 0) {
                        message = messageList[messageList.length - 1].text;
                        // console.log("*chatThreads update useEffect* Most recent message: " + message);
                    } else {
                        console.log(
                            "*chatThreads update useEffect* Chat thread has no messages."
                        );
                    }
                } else {
                    console.log(
                        "*chatThreads update useEffect* Chat thread is missing messages attribute."
                    );
                }

                return {
                    readableChatId: chatData.chatId,
                    images: otherProfileImage,
                    name: otherUsername,
                    message: message,
                };
            });

            const chatObjects = await Promise.all(chatThreadsPromises);
            setReadableChatThreads(chatObjects);
        };

        fetchChatThreads();
    }, [chatThreads]);

    const minScroll = 200;

    const scrollOffsetY = useRef(new Animated.Value(0)).current;
    const animHeaderValue = scrollOffsetY;

    const headerHeight = 120;
    const activeRange = 200;

    const diffClamp = Animated.diffClamp(
        animHeaderValue,
        -minScroll,
        activeRange + minScroll
    );
    const animatedHeaderHeight = diffClamp.interpolate({
        inputRange: [0, activeRange],
        outputRange: [0, -headerHeight],
        extrapolate: "clamp",
    });

    const handleRefresh = () => {
        getChatsByUser(getUserID()).then((chatThreads) => {
            setChatThreads(chatThreads);
        });
    }

    // const [selectedChat, setSelectedChat] = useState("");
    // const [search, setSearch] = useState("");

    async function handleItemPress(chat) {
        // console.log("*ChatScreen* Selected chat: ", chat.readableChatId);
        router.push({
            pathname: "ConversationsScreen",
            params: { chatId: chat.readableChatId },
        });
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: styles.colors.lightColor }}>
            {/* Search bar was taken from homescreen, so will not have functionality. */}
            {/* was 80 */}
            <SquareHeader height={120} />
            <Animated.View
                style={{
                    zIndex: 1,
                    transform: [{ translateY: animatedHeaderHeight }],
                }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                        paddingHorizontal: "2%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: styles.colors.darkColor,
                    }}>
                    <View style={{ justifyContent: "center", width: "100%" }}>
                        {/* <SearchBarHeader handleSearch={handleSearch} /> */}
                        <SearchBarHeader />
                    </View>
                </View>
            </Animated.View>
            <SwipeListView
                data={Object.values(readableChatThreads)}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback
                        style={{ width: "100%" }}
                        onPress={() => handleItemPress(item)}
                        key={item.readableChatId}>
                        <View
                            style={{
                                backgroundColor: styles.colors.lightColor,
                                flex: 1,
                                flexDirection: "row",
                                padding: 2,
                            }}>
                            <Image
                                source={{ uri: item.images }}
                                style={{ width: 100, height: 100 }}
                            />
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    paddingLeft: "3%",
                                }}>
                                {/* <Text style={{ fontWeight: "bold" }}>{"$" + item.price + " - " + item.title}</Text> */}
                                <Text style={{ fontWeight: "bold" }}>
                                    {typeof item.name === "string"
                                        ? item.name
                                        : "Name is not a string"}
                                </Text>
                                <Text>
                                    {typeof item.message === "string"
                                        ? item.message
                                        : "Message is not a string"}
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )}
                ItemSeparatorComponent={() => (
                    <View style={{ alignItems: "center" }}>
                        <View
                            style={[
                                styles.dividerLine,
                                { marginBottom: 10, marginTop: 10 },
                            ]}
                        />
                    </View>
                )}
                renderHiddenItem={({ item }) => (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "flex-end",
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
                            <Ionicons
                                name="alert-circle-outline"
                                size={32}
                                color="black"
                            />
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
                            <Ionicons
                                name="trash-outline"
                                size={32}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                )}
                disableRightSwipe={true}
                rightOpenValue={-150}
                keyExtractor={(item) => item.readableChatId}
                contentContainerStyle={{
                    paddingBottom: "25%", // Add this line
                    paddingTop: 10,
                }}
                scrollEventThrottle={10}
                style={{
                    flex: 1,
                    backgroundColor: styles.colors.lightColor,
                    //paddingTop: 0,
                    marginTop: 68,
                    //backgroundColor: "red",
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                    { useNativeDriver: false }
                )}
                bounces={true}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor={styles.colors.darkColor}
                    />
                }
            />
        </SafeAreaView>
    );
}
