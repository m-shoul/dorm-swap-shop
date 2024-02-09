import {
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    /*Image,*/ Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import React, { useState, useEffect, useRef } from "react";
import styles from "../(aux)/StyleSheet";
//import { getAuth, signOut } from "firebase/auth";
//import ListingPopup from "../../components/ListingPopup.js";
import { SearchBar, Header } from "@rneui/themed";
// import { get, child, ref, set, push, getDatabase } from 'firebase/database';
import { SwipeListView } from "react-native-swipe-list-view";
import TrashButtonComponent from "../../assets/svg/trash_button";
import ReportComponent from "../../assets/svg/report_icon";
import SearchBarHeader from "../../components/SearchBar";
import { router } from "expo-router";
import { createChatThread, addMessage } from "../../backend/api/chat.js";
import SquareHeader from "../../components/SquareHeader.js";

//import styles from "../styleSheets/StyleSheet.js";
//import { HeaderComponent } from "../components/headerComponent.js";

export default function ChatScreen() {
    const scrollOffsetY = useRef(new Animated.Value(0)).current;
    const handleSearch = () => {
        null;
    };

    // Used for test purposes.
    const testData = [
        {
            id: "1",
            images: "https://reactnative.dev/img/tiny_logo.png",
            name: "Joe Schmoe",
            message: "Hello world",
        },
        {
            id: "2",
            images: "https://reactnative.dev/img/tiny_logo.png",
            name: "Schmoe Joe",
            message: "World hello",
        },
    ];

    const [selectedChat, setSelectedChat] = useState("");
    const [search, setSearch] = useState("");

    async function handleItemPress(chat) {
        // // Testing
        // const chatId = await createChatThread("1", "2");
        // await addMessage(chatId, "1", "Hello world");
        // await addMessage(chatId, "2", "World hello");
        // ////////


        // setSelectedChat(chat);
        router.push({ pathname: "ConversationsScreen", params: { chatId: "-No-UTyWWAvH6rZ5BCtt" } }); // { chatId: chat.id });
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
                data={Object.values(testData)}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback
                        style={{ width: "100%" }}
                        onPress={() => handleItemPress(item)}
                        key={item.id}>
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
                                        {item.name}
                                    </Text>
                                    <Text>{item.message}</Text>
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
                keyExtractor={(item) => item.id}
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
