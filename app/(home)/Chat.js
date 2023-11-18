import { Text, View, TouchableOpacity, SafeAreaView, Image, Animated } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../(aux)/StyleSheet";
//import { getAuth, signOut } from "firebase/auth";
//import ListingPopup from "../../components/ListingPopup.js";
import { SearchBar, Header } from "@rneui/themed";
import { get, child, ref, set, push, getDatabase } from 'firebase/database';
import { SwipeListView } from 'react-native-swipe-list-view';
import TrashButtonComponent from "../../assets/svg/trash_button";
import ReportComponent from "../../assets/svg/report_icon";
import { SafeAreaProvider } from 'react-native-safe-area-context';

//import styles from "../styleSheets/StyleSheet.js";
//import { HeaderComponent } from "../components/headerComponent.js";


export default function ChatScreen() {

    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, 100);
    const translateYAxis = diffClamp.interpolate({
        inputRange: [0, 100],
        outputRange: [0, -100],
    });

     // Used for test purposes.
    const testData = [{
        id: "1",
        name: "Joe Schmoe",
        message: "Hello world"
    },
    {
        id: "2",
        name: "Schmoe Joe",
        message: "World hello"
    }];

    const [selectedChat, setSelectedChat] = useState("");
    const [search, setSearch] = useState("");

    function handleItemPress(chat) {
        setSelectedChat(chat);
    }

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: "#F9F7F7" }}>
            {/* <Animated.View style={{
                transform: [{ translateY: translateYAxis }],
                elevation: 4,
                zIndex: 100,
            }}> */}
            <SearchBar
                round
                searchIcon={{ size: 24, color: "black" }}
                containerStyle={styles.searchContainer}
                inputStyle={{ backgroundColor: "#fff" }}
                inputContainerStyle={{
                    backgroundColor: "#fff", borderRadius: 40,
                    borderWidth: 1, borderBottomWidth: 1, borderColor: "#B3B3B3"
                }}
                onChangeText={setSearch}
                //onClear={(text) => searchFilterFunction("")}
                placeholder="Search"
                value={search}
            />
            {/* </Animated.View> */}

            {/* Scrollable view displaying all the chat messages */}
            <SwipeListView
                data={Object.values(testData)}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ width: "100%", height: 150, padding: "1%" }}
                        onPress={() => handleItemPress(item)}
                        key={item.id}
                    >
                        <View style={{ backgroundColor: "white", flexDirection: "row", flex: 1, marginLeft: "3%", marginRight: "3%" }}>
                            {/* Source might be something like source={{uri: item.images}} */}
                            <Image source={require("../../assets/expo/splash_screen_dark.png")} style={{ width: "30%", height: "90%" }} />
                            <View style={{ justifyContent: "center", paddingLeft: "5%" }}>
                                {/* <Text style={{ fontWeight: "bold" }}>{"$" + item.price + " - " + item.title}</Text> */}
                                <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                                <Text>{item.message}</Text>
                            </View>

                        </View>
                        <View style={{
                            backgroundColor: "#B3B3B3", height: 1,
                            marginBottom: "5%", marginLeft: "7%", marginRight: "7%"
                        }} />
                    </TouchableOpacity>

                )}
                renderHiddenItem={({ }) => (
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", marginBottom: "6%", marginTop: "1%", marginRight: "4%" }}>
                        <TouchableOpacity
                            style={{ width: 75, backgroundColor: "red", alignItems: "center", justifyContent: "center" }}
                            onPress={() => {
                                // Handle the "Report" action
                            }}

                        >
                            <ReportComponent />
                            {/* <Text style={{ color: "white" }}>Report</Text> */}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ width: 75, backgroundColor: "blue", alignItems: "center", justifyContent: "center" }}
                            onPress={() => {
                                // Handle the "Delete" action
                            }}
                        >
                            <TrashButtonComponent />
                            {/* <Text style={{ color: "white" }}>Delete</Text> */}
                        </TouchableOpacity>
                    </View>
                )}
                leftOpenValue={0}
                rightOpenValue={-145}
                keyExtractor={(item) => item.id}
                style={{ flex: 1, backgroundColor: "#F9F7F7", paddingTop: "5%" }}
                onScroll={(e) => {
                    scrollY.setValue(e.nativeEvent.contentOffset.y);
                }}
            //bounces={true}
            />
        </SafeAreaProvider>
    );
}