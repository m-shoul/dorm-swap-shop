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
import { getUser, getUserSavedListings } from "../../backend/api/user.js";
import ListingPopup from "../../components/ListingPopup.js";
import ListImagesComponent from "../../assets/svg/list_images.js";
import RatingComponent from "../../assets/svg/rating_stars.js";

import { Button } from "../../components/Buttons.js";

export default function ProfileScreen() {
    const [listingsData, setListingsData] = useState([]);
    const [savedListings, setSavedListings] = useState([]);

    const [selectedListing, setSelectedListing] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // const fetchSavedListings = async () => {
        //     try {
        //         const savedListings = await getUserSavedListings();
        //         setSavedListings(savedListings);
        //         console.log("Got user saved listings.");
        //     } catch (error) {
        //         console.error("Could not get saved listings: ", error);
        //     }
        // };

        const fetchListingData = async () => {
            try {
                const listingsData = await getUserListings();
                setListingsData(listingsData);
                console.log("Got user listings.");
            } catch (error) {
                console.error("Could not get user listings: ", error);
            }
        };
        fetchListingData();

        const fetchUserData = async () => {
            try {
                const user = await getUser();
                console.log("Got user data.");
                setUser(user);
            } catch (error) {
                console.error("Could not get user data: ", error);
            }
        }

        // fetchSavedListings();
        fetchListingData();
        fetchUserData();
    }, []);

    const handleItemPress = (listing) => {
        setSelectedListing(listing);
    };

    const noSavedListings = () => (
        <Text style={{ textAlign: 'center' }}>No saved listings</Text>
    );

    // console.log(savedListings);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F7F7" }}>
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

            <View style={{ width: "100%", marginBottom: "5%", alignItems: "center" }}>
                <View
                    style={{
                        width: 190,
                        height: 190,
                        borderRadius: 200,
                        overflow: "hidden",
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
            </View>


            <View style={{ width: "100%", alignItems: "center" }}>
                <Text style={styles.boldtext}>{user && user.public && `${user.public.fname} ${user.public.lname}`}</Text>
            </View>
            {/* <View>
                <Text style={styles.boldtext}>{user && user.public && `${"Rating: " + user.public.rating}`}</Text>
            </View> */}
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
                    justifyContent: "center",
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
            <View style={{ alignItems: "center" }}>
                <View style={[styles.dividerLine, { marginBottom: 1, }]} />
            </View>

            {/* Scrollable view displaying all the listings */}
            <FlatList
                // We want the savedListings state to be in here to render, but its being stupid because
                // it then says listing.title.length doesn't exist and I don't know why... is it trying to
                // render something that doesn't exist? Or is it not finding the listing based on the id??
                data={Object.values(listingsData)}
                //keyExtractor={(item) => item.listingId}
                renderItem={({ item }) => (
                    <View style={{ width: "50%", height: 230, padding: "1%" }}>
                        {/* <TouchableOpacity
                            onPress={() => handleItemPress(item)}
                            key={item.id}> */}
                        <ListingPopup listing={item} />
                        {/* </TouchableOpacity> */}
                    </View>

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
                ListEmptyComponent={noSavedListings}
            />
        </SafeAreaView>
    );
}
