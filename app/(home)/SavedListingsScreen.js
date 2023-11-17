import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Image,
    Modal,
    Animated,
} from "react-native";
import { get, child, ref, set, push, getDatabase } from "firebase/database";
import ListingPopup from "../../components/ListingPopup.js";
import React, { useState, useEffect } from "react";
import { SearchBar, Header } from "@rneui/themed";
import styles from "../(aux)/StyleSheet.js";

import BackButtonComponent from "../../assets/svg/back_button.js";
import ProfileScreen from "./Profile.js";

const SavedListingsScreen = ({ navigation }) => {
    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, 100);
    const translateYAxis = diffClamp.interpolate({
        inputRange: [0, 100],
        outputRange: [0, -100],
    });

    const [search, setSearch] = useState("");
    const [listingsData, setListingsData] = useState([]); // State to store listings data
    const [selectedListing, setSelectedListing] = useState(null); // State to store the selected listing
    const [showProfile, setShowProfile] = useState(false);
    const db = getDatabase();
    const listingsReference = ref(db, "dorm_swap_shop/listings/");

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

    if (showProfile) {
        return <ProfileScreen />;
    }
    const data = [
        { key: "Item 1" },
        { key: "Item 2" },
        { key: "Item 3" },
        // ...more items
    ];
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F7F7" }}>
            {/* Search bar was taken from homescreen, so will not have functionality. */}
            <TouchableOpacity onPress={() => setShowProfile(true)}>
                {/* Should be changed to navigation.navigatee */}
                <BackButtonComponent
                    //require("../assets/svg/back_button.js")}
                    style={{
                        width: 200,
                        height: 28,
                        stroke: "black",
                        strokeWidth: 0.25,
                        marginBottom: 10,
                    }}
                />
            </TouchableOpacity>
            <View
                style={{
                    height: "5%",
                }}>
                <SearchBar
                    round
                    searchIcon={{ size: 24, color: "black" }}
                    containerStyle={styles.searchContainer}
                    inputStyle={{ backgroundColor: "#fff" }}
                    inputContainerStyle={{
                        backgroundColor: "#fff",
                        borderRadius: 40,
                        borderWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: "#B3B3B3",
                    }}
                    onChangeText={setSearch}
                    //onClear={(text) => searchFilterFunction("")}
                    placeholder="Search"
                    value={search}
                />
            </View>
            <FlatList
                data={Object.values(listingsData)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            width: 400,
                            marginTop: 20,
                            padding: 10,

                            flex: 1,
                            margin: 0,
                        }}
                        onPress={() => handleItemPress(item)}
                        key={item.id}>
                        <View
                            style={{
                                backgroundColor: "#F9F7F7",
                                flex: 1,
                                flexDirection: "row",

                                width: 370,
                                justifyContent: "space-between",
                            }}>
                            {/* Source might be something like source={{uri: item.images}} */}
                            <Image
                                //source={require("../assets/expo/splash_screen_dark.png")}
                                style={{
                                    width: 100,
                                    height: 100,
                                }}
                            />

                            <View style={{ flex: 1 }}>
                                <Text style={styles.boldtext}>
                                    {item.title}
                                </Text>
                                <Text>{"$" + item.price}</Text>
                                <Text>{item.condition}</Text>
                                <Text>{item.description}</Text>
                            </View>
                        </View>

                        <ListingPopup listing={item} navigation={navigation} />
                        <View
                            style={{
                                backgroundColor: "#B3B3B3",
                                height: 1,

                                marginLeft: 10,
                                marginRight: 20,
                                marginBottom: -20,
                            }}
                        />
                    </TouchableOpacity>
                )}
                //numColumns={2}
                keyExtractor={(item) => item.id}
                style={{
                    flex: 1,
                    backgroundColor: "#F9F7F7",
                    marginTop: 10,
                }}
                onScroll={(e) => {
                    scrollY.setValue(e.nativeEvent.contentOffset.y);
                }}
                bounces={false}
            />
        </SafeAreaView>
    );
};

export default SavedListingsScreen;
