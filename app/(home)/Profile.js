import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Image,
} from "react-native";
import styles from "../(aux)/StyleSheet.js";
import { get, ref, getDatabase } from "@firebase/database";
// import { getUserID } from "../../backend/dbFunctions.js";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { getUserID } from "../../backend/dbFunctions.js";
import { getUserListings } from "../../backend/api/listing.js";

import ListingPopup from "../../components/ListingPopup.js";
import ListImagesComponent from "../../assets/svg/list_images.js";
import RatingComponent from "../../assets/svg/rating_stars.js";

import { Button } from "../../components/Buttons.js";

export default function ProfileScreen() {
    const [listingsData, setListingsData] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);

    useEffect(() => {
        const fetchUserListings = async () => {
            try {
                const listingsData = await getUserListings();
                setListingsData(listingsData);
                console.log("Got user listings.");
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchUserListings();
    }, []);

    const handleItemPress = (listing) => {
        setSelectedListing(listing);
    };

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
                {/* Goes to saved listings */}
                <Button
                    width="45%"
                    height="33%"
                    backgroundColor="#3F72AF"
                    title="My Listings"
                    alignItems="center"
                    justifyContent="center"
                    marginRight="5%"
                    borderRadius="25%"
                    href="SavedListingsScreen"
                    titleStyle={[styles.boldtext, { color: "white" }]}
                />

                {/* Goes to chats */}
                <Button
                    width="45%"
                    height="33%"
                    backgroundColor="#3F72AF"
                    title="Chat"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="25%"
                    href="Chat"
                    titleStyle={[styles.boldtext, { color: "white" }]}
                />
            </View>
            <View
                style={{
                    alignSelf: "stretch",
                    paddingLeft: "5%",
                    marginBottom: "4%",
                }}>
                <Text style={styles.boldtext}>Saved Listings</Text>
            </View>
            <View style={[styles.dividerLine, { marginBottom: 1 }]} />
            {/* Scrollable view displaying all the listings */}
            <FlatList
                data={Object.values(listingsData)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{ width: "50%", height: 230, padding: "1%" }}
                        onPress={() => handleItemPress(item)}
                        key={item.id}>
                        <ListingPopup listing={item} navigation={router} />
                    </TouchableOpacity>
                )}
                numColumns={2}
                keyExtractor={(item) => item.id}
                style={{
                    flex: 1,
                    backgroundColor: "#F9F7F7",
                    paddingTop: "2%",
                }}
                onScroll={(e) => {
                    // scrollY.setValue(e.nativeEvent.contentOffset.y);
                }}
                bounces={false}
            />
        </SafeAreaView>
    );
}
