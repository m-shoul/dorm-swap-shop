import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import React, { useState, useEffect } from "react";
import { Image } from 'expo-image';
import ListImagesComponent from "../assets/svg/list_images.js";
import styles from "../app/(aux)/StyleSheet.js";
import * as ImagePicker from "expo-image-picker";
import { Button } from "./Buttons.js";
import { getAllUserDataForProfile, uploadProfileImage } from "../backend/api/user.js";
import CachedImage from "expo-cached-image";
import RoundHeader from "./RoundHeader.js";
import { router } from "expo-router";

export default function ProfileHeader() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserData = async () => {
        try {
            const user = await getAllUserDataForProfile();
            console.log("***IN APP - Profile.js*** - Got user data for user: " + user.public.fname + " " + user.public.lname);
            setUser(user);
            setIsLoading(false);
        } catch (error) {
            console.error("***IN APP - Profile.js*** - Could not get user data: ", error);
            setIsLoading(false);
        }
    }

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

    var shortHash = require('short-hash');

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <>
            {/* <TouchableOpacity
                style={{
                    alignSelf: "stretch",
                    paddingRight: "5%",
                    marginBottom: "4%",
                }}>
                <Text style={[styles.boldtext, { textAlign: "right" }]}>
                    Edit
                </Text>
            </TouchableOpacity> */}
            <RoundHeader height="25%" />
            <View style={{ marginBottom: "5%", alignItems: "center" }}>
                <TouchableOpacity
                    style={{
                        alignSelf: "stretch",
                        paddingRight: "5%",
                        marginBottom: "4%",
                    }}
                    onPress={() => router.push("EditProfile")}
                >
                    <Text style={[styles.boldtext, { textAlign: "right", color: "#F9F7F7" }]}>
                        Edit
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickProfileImage} style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.8,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}>
                    <View
                        style={{
                            width: 190,
                            height: 190,
                            borderRadius: 200,
                            overflow: "hidden",
                            //borderWidth: 2,
                            justifyContent: "center",
                            backgroundColor: "white",
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
                                source={require("../assets/svg/list_images.js")}
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
                    marginBottom: "-5%",
                    justifyContent: "center",
                    paddingHorizontal: 20,
                    backgroundColor: "transparent",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.8,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}>
                {/* Goes to saved listings */}
                <Button
                    width="45%"
                    height="40%"
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
                    height="40%"
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
                <View style={[styles.dividerLine, { marginBottom: 20, }]} />
            </View>
        </>
    );
}