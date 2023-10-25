import { Text, View, TouchableOpacity, FlatList, SafeAreaView, Image, Modal, Animated } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styleSheets/StyleSheet.js";
//import { getAuth, signOut } from "firebase/auth";
import ListingPopup from "../components/ListingPopup.js";
import { SearchBar, Header } from "@rneui/themed";
import { get, child, ref, set, push, getDatabase } from 'firebase/database';

//import styles from "../styleSheets/StyleSheet.js";
//import { HeaderComponent } from "../components/headerComponent.js";


const ChatScreen = ({ navigation }) => {

    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, 100);
    const translateYAxis = diffClamp.interpolate({
        inputRange: [0, 100],
        outputRange: [0, -100],
    });

    const [search, setSearch] = useState("");
    const [listingsData, setListingsData] = useState([]); // State to store listings data
    const [selectedListing, setSelectedListing] = useState(null); // State to store the selected listing


    const db = getDatabase();
    const listingsReference = ref(db, 'dorm_swap_shop/listings/');

    const fetchListings = () => {
        get(listingsReference)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const listingsData = snapshot.val();
                    // Set the retrieved data to the state
                    setListingsData(listingsData);
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching listings:", error);
            });
    };

    useEffect(() => {
        // Fetch listings data from Firebase when the component mounts
        fetchListings();
    }, []);

    const handleItemPress = (listing) => {
        setSelectedListing(listing);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F7F7" }}>
            <Animated.View style={{
                transform: [{ translateY: translateYAxis }],
                elevation: 4,
                zIndex: 100,
            }}>
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
            </Animated.View>
            {/* </View> */}

            {/* Refresh button */}
            {/* <TouchableOpacity onPress={fetchListings} style={{ marginTop: "10%" }}>
                <Text>Refresh</Text>
            </TouchableOpacity> */}

            {/* Scrollable view displaying all the listings */}
            <FlatList
                data={Object.values(listingsData)}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ width: "50%", height: 200, padding: "1%" }}
                        onPress={() => handleItemPress(item)}
                        key={item.id}
                    >
                        <View style={{ backgroundColor: "white", flex: 1 }}>
                            {/* Source might be something like source={{uri: item.images}} */}
                            <Image source={require("../assets/expo/splash_screen_dark.png")} style={{ width: "100%", height: "80%" }} />
                            <View style={{ backgroundColor: "#B3B3B3", height: 1, width: "100%", marginBottom: "5%" }} />
                            <Text>{"$" + item.price + " - " + item.title}</Text>
                        </View>
                        <ListingPopup
                            listing={item}
                            navigation={navigation}
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                style={{ flex: 1, backgroundColor: "#F9F7F7", paddingTop: "5%" }}
                onScroll={(e) => {
                    scrollY.setValue(e.nativeEvent.contentOffset.y);
                }}
                bounces={false}
            />
        </SafeAreaView>
    );
}

export default ChatScreen;