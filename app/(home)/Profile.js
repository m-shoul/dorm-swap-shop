import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Image } from "react-native";
import styles from "../(aux)/StyleSheet.js";
import { get, ref, getDatabase } from "@firebase/database";
// import { getUserID } from "../../backend/dbFunctions.js";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { getUserID } from "../../backend/dbFunctions.js";

import ListingPopup from "../../components/ListingPopup.js";
import ListImagesComponent from "../../assets/svg/list_images.js";
import RatingComponent from "../../assets/svg/rating_stars.js";

export default function ProfileScreen() {
    const [listingsData, setListingsData] = useState([]);

    const db = getDatabase();
    // const listingsReference = ref(db, 'dorm_swap_shop/users/' + getUserID() + 'listings/');
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

    // work in progress - need to filter listings by user ID
    // const fetchListings = () => {
    //     userId = getUserID();
    //     console.log("userId: " + userId);
    //     get(listingsReference)
    //         .then((snapshot) => {
    //             if (snapshot.exists()) {
    //                 const listingsData = snapshot.val();
    //                 console.log("listingsData: " + listingsData);

    //                 // Filter listings by the logged-in user's ID
    //                 const userListings = Object.values(listingsData).filter((listing) => listing.userId === userId);
    //                 console.log(userListings);
    //                 // Set the filtered data to the state
    //                 setListingsData(userListings);
    //             } else {
    //                 console.log("No data available");
    //             }
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching listings:", error);
    //         });
    // };

    const handleItemPress = (listing) => {
        // setSelectedListing(listing);
    };

    useEffect(() => {
        // Fetch listings data from Firebase when the component mounts
        fetchListings();
    }, []);

    return (
        <SafeAreaView style={styles.background}>
            <TouchableOpacity
                style={{
                    alignSelf: "stretch",
                    paddingRight: "5%",
                    marginBottom: "4%",
                }}>
                <Text style={[styles.boldtext, { textAlign: "right" }]}>
                    Edit
                </Text>
            </TouchableOpacity>

            <View
                style={{
                    width: 190,
                    height: 190,
                    borderRadius: 200,
                    overflow: "hidden",
                    marginBottom: "5%",
                    borderWidth: 1,
                    borderColor: "#B3B3B3",
                }}>
                <ListImagesComponent
                    source={require("../../assets/svg/list_images.js")}
                    style={{
                        width: "100%",
                        height: "100%",
                        stroke: "black",
                        strokeWidth: 0.25,
                    }}
                />
            </View>
            <View>
                <Text style={styles.boldtext}>Full Name</Text>
            </View>
            {/* <View>
                <RatingComponent
                    source={require("../assets/svg/list_images.js")}
                    style={{
                        width: "100%",
                        height: "100%",
                        stroke: "black",
                        strokeWidth: 0.25,
                    }}
                />
            </View> */}
            <View
                style={{
                    paddingTop: "5%",
                    flexDirection: "row",
                    marginBottom: "-15%",
                    justifyContent: "space-between",
                    //paddingHorizontal: 20,
                }}>
                <TouchableOpacity
                    style={{
                        width: "45%",
                        height: "33%",
                        borderRadius: "25%", //was 25

                        alignItems: "center",
                        justifyContent: "center",

                        backgroundColor: "#3F72AF",
                        marginRight: "5%",
                    }}
                    onPress={() => navigation.navigate("SavedListings")}>
                    <Text style={[styles.boldtext, { color: "white" }]}>
                        Saved Listings
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: "45%",
                        height: "33%",
                        borderRadius: "25%", //was 25

                        alignItems: "center",
                        justifyContent: "center",

                        backgroundColor: "#3F72AF",
                    }}
                    onPress={() => navigation.navigate("Chat")}>
                    {/* Should be a button to go to Chat */}
                    <Text style={[styles.boldtext, { color: "white" }]}>
                        Inbox
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    alignSelf: "stretch",
                    paddingLeft: "5%",
                    marginBottom: "4%",
                }}>
                <Text style={styles.boldtext}>My Listings</Text>
            </View>
            <View style={styles.dividerLine} />
            {/* Scrollable view displaying all the listings */}
            <FlatList
                data={Object.values(listingsData)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{ width: "50%", height: 200, padding: "1%" }}
                        onPress={() => handleItemPress(item)}
                        key={item.id}>
                        <View style={{ backgroundColor: "white", flex: 1 }}>
                            {/* Source might be something like source={{uri: item.images}} */}
                            <Image
                                source={require("../../assets/expo/splash_screen_dark.png")}
                                style={{ width: "100%", height: "80%" }}
                            />
                            <View
                                style={{
                                    backgroundColor: "#B3B3B3",
                                    height: 1,
                                    width: "100%",
                                    marginBottom: "5%",
                                }}
                            />
                            <Text>{"$" + item.price + " - " + item.title}</Text>
                        </View>
                        <ListingPopup listing={item} navigation={router} />
                    </TouchableOpacity>
                )}
                numColumns={2}
                keyExtractor={(item) => item.id}
                style={{
                    flex: 1,
                    backgroundColor: "#F9F7F7",
                    paddingTop: "5%",
                }}
                onScroll={(e) => {
                    // scrollY.setValue(e.nativeEvent.contentOffset.y);
                }}
                bounces={false}
            />

        </SafeAreaView>
    );
};
