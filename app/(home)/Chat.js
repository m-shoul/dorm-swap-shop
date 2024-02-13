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
// import { get, child, ref, set, push, getDatabase } from 'firebase/database';
import { SwipeListView } from "react-native-swipe-list-view";
import SearchBarHeader from "../../components/SearchBar";
import { router } from "expo-router";
import { createChatThread, addMessage } from "../../backend/api/chat.js";
import SquareHeader from "../../components/SquareHeader.js";
import filter from "lodash.filter";

// New icons
import { Ionicons } from '@expo/vector-icons';

//import styles from "../styleSheets/StyleSheet.js";
//import { HeaderComponent } from "../components/headerComponent.js";

export default function ChatScreen() {
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
    const [fullData, setFullData] = useState([]);
    useEffect(() => { setFullData(testData); }, []);


    async function handleItemPress(chat) {
        // // Testing
        // const chatId = await createChatThread("1", "2");
        // await addMessage(chatId, "1", "Hello world");
        // await addMessage(chatId, "2", "World hello");
        // ////////


        // setSelectedChat(chat);
        router.push({ pathname: "ConversationsScreen", params: { chatId: "-No-UTyWWAvH6rZ5BCtt" } }); // { chatId: chat.id });
    }
    const scrollOffsetY = useRef(new Animated.Value(0)).current;
    // const handleSearch = (query) => {
    //     const formattedQuery = query.toLowerCase();
    //     const filteredData = filter(fullData, (testData) => {
    //         return contains(testData, formattedQuery);
    //     });
    //     setTestData(filteredData);
    // };
    const minScroll = 300;

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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: styles.colors.lightColor }}>
            {/* Search bar was taken from homescreen, so will not have functionality. */}
            <SquareHeader height={80} />
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
                data={Object.values(testData)}
                renderItem={({ item }) => {
                    return (
                        <TouchableWithoutFeedback
                            onPress={() => handleItemPress(item)}
                            key={item.id}>
                            <View
                                style={{
                                    backgroundColor: styles.colors.lightColor,
                                    flex: 1,
                                    flexDirection: "row",
                                    padding: 2,
                                    //paddingRight: "5%",
                                    //width: 370,
                                    //justifyContent: "space-between",
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
                                        {item.name}
                                    </Text>
                                    <Text>{item.message}</Text>
                                </View>

                                {/* For now this is commented out since the listing popup is broken */}
                                {/* <ListingPopup listing={item} navigation={navigation} /> */}
                            </View>
                        </TouchableWithoutFeedback>
                    );
                }}
                ItemSeparatorComponent={() => (
                    <View style={{ alignItems: "center" }}>
                        <View style={[styles.dividerLine, { marginBottom: 10, marginTop: 10 }]} />
                    </View>
                )}
                renderHiddenItem={({ item }) => (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            // marginBottom: "6%",
                            // marginTop: "1%",
                            // marginRight: "4%",
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
                            <Ionicons name="alert-circle-outline" size={32} color="black" />
                            {/* <ReportComponent width="50%" height="50%" /> */}
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
                            {/* <TrashButtonComponent width="40%" height="40%" /> */}
                            <Ionicons name="trash-outline" size={32} color="black" />
                        </TouchableOpacity>
                    </View>
                )}
                disableRightSwipe={true}
                rightOpenValue={-150}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    paddingBottom: "15%", // Add this line
                }}
                scrollEventThrottle={10}
                style={{
                    flex: 1,
                    backgroundColor: styles.colors.lightColor,
                    paddingTop: 85,
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                    { useNativeDriver: false }
                )}
                bounces={true}
            />
        </SafeAreaView>
    );
}
