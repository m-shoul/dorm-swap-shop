import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StyleSheet,
    //Image,
    ActivityIndicator,
    RefreshControl
} from "react-native";
import { Image } from 'expo-image';
import styles from "../(aux)/StyleSheet.js";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { getAllUserDataForProfile, getUserSavedListings, uploadProfileImage } from "../../backend/api/user.js";
import ListingPopup from "../../components/ListingPopup.js";
import ListImagesComponent from "../../assets/svg/list_images.js";
import RatingComponent from "../../assets/svg/rating_stars.js";
import * as ImagePicker from "expo-image-picker";
// import { Camera, CameraType } from 'expo-camera';
import { Button } from "../../components/Buttons.js";
import CachedImage from "expo-cached-image";

export default function ProfileScreen() {
    const [savedListings, setSavedListings] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchSavedListings = async () => {
        try {
            const savedListings = await getUserSavedListings();
            setSavedListings(savedListings);
            setIsLoading(false);
        } catch (error) {
            console.error("ERROR: Could not get saved listings: ", error);
            setIsLoading(false);
        }
    };

    const fetchUserData = async () => {
        try {
            const user = await getAllUserDataForProfile();
            setUser(user);
            setIsLoading(false);
        } catch (error) {
            console.error("ERROR: Could not get user data: ", error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchSavedListings();
        fetchUserData();
    }, []);

    const handleItemPress = (listing) => {
        setSelectedListing(listing);
    };

    const handleRefresh = () => {
        fetchSavedListings();
        fetchUserData();
    }

    const noSavedListings = () => (
        <Text style={{ textAlign: 'center' }}>No saved listings</Text>
    );

    // Profile image stuff
    const [profileImage, setProfileImage] = useState(null);
	const pickProfileImage = async () => {
        console.log("Picking profile image.");
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
            selectionLimit: 1,
			aspect: [1, 1],
			quality: 0.1
		});

		if (result.assets && result.assets.length > 0) {
			const selectedProfileImage = result.assets[0];
			setProfileImage(selectedProfileImage.uri);
            uploadProfileImage(selectedProfileImage.uri);
		}
	};

    const profileImageUrl = user?.public?.profileImage;
    
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
                <TouchableOpacity onPress={pickProfileImage}>
                    <View
                        style={{
                            width: 190,
                            height: 190,
                            borderRadius: 200,
                            overflow: "hidden",
                            borderWidth: 1,
                            borderColor: "#B3B3B3",
                            justifyContent: "center"
                        }}>
                        {profileImageUrl ? (
                            <CachedImage    
                                source={{ uri: profileImageUrl }}
                                cacheKey={`user-${user.id}-profileImage`}
                                // cacheKey={shortHash(user.id)} // this might be user.userId
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        ) : (
                            <ListImagesComponent
                                source={require("../../assets/svg/list_images.js")}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    stroke: "black",
                                    strokeWidth: 0.25,
                                }}
                            />   
                        )}
                    </View>
                </TouchableOpacity>
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
                    href="MyListingsScreen"
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

            {isLoading ? (
                <ActivityIndicator size="large" color="#112d4e" />
            ) : (
                <FlatList
                    data={savedListings || []}
                    keyExtractor={(item) => item.listingId}
                    renderItem={({ item }) => (
                        <View style={{ width: "50%", height: 230, padding: "1%" }}>
                            <ListingPopup listing={item} />
                        </View>
                    )}
                    numColumns={2}
                    style={{
                        flex: 1,
                        backgroundColor: "#F9F7F7",
                        paddingTop: "2%",
                    }}
                    onScroll={(e) => {
                        // scrollY.setValue(e.nativeEvent.contentOffset.y);
                    }}
                    bounces={true}
                    refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                    }
                    ListEmptyComponent={noSavedListings}
                />
            )}
        </SafeAreaView>
    );
}
