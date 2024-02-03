import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../(aux)/StyleSheet.js";
import { router } from "expo-router";
import RoundHeader from "../../components/RoundHeader";
import ListImagesComponent from "../../assets/svg/list_images.js";
import { getAllUserDataForProfile, uploadProfileImage } from "../../backend/api/user.js";
import CachedImage from "expo-cached-image";
import { Button } from "../../components/Buttons.js";

export default function EditListings() {
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
        <SafeAreaView style={styles.background}>
            <RoundHeader height="37%" />
            <View style={{ marginBottom: "5%", alignItems: "center", width: "100%" }}>
                <Text style={[styles.loginHeader, { color: "#F9F7F7" }]}>
                    Edit Profile
                </Text>

                <View style={[styles.dividerLine, { backgroundColor: "white" }]} />

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
                <Text>Change Picture</Text>
            </View>

            <View>
                <View>
                    <Text style={styles.boldtext}>Username</Text>
                    <TextInput
                        style={styles.createUserInput}
                        //value={email}
                        onChangeText={(value) => setEmail(value)}
                        placeholder="Username"
                        onSubmitEditing={() => {
                            // Focus on the password input when the user submits the email input
                            passwordInputRef.current.focus();
                        }}
                        blurOnSubmit={false}
                    />
                </View>
                <View>
                    <Text style={styles.boldtext}>Email</Text>
                    <TextInput
                        style={styles.createUserInput}
                        //value={email}
                        onChangeText={(value) => setEmail(value)}
                        placeholder="Email"
                        onSubmitEditing={() => {
                            // Focus on the password input when the user submits the email input
                            passwordInputRef.current.focus();
                        }}
                        blurOnSubmit={false}
                    />
                </View>
                <View>
                    <Text style={styles.boldtext}>Password</Text>
                    <TextInput
                        style={styles.createUserInput}
                        //value={email}
                        onChangeText={(value) => setEmail(value)}
                        placeholder="Password"
                        onSubmitEditing={() => {
                            // Focus on the password input when the user submits the email input
                            passwordInputRef.current.focus();
                        }}
                        blurOnSubmit={false}
                    />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        //paddingHorizontal: 2,
                        // backgroundColor: "transparent",
                        // shadowColor: "#000",
                        // shadowOffset: {
                        //     width: 0,
                        //     height: 4,
                        // },
                        // shadowOpacity: 0.8,
                        // shadowRadius: 3.84,
                        // elevation: 5,
                    }}>

                    <Button
                        width="35%"
                        height="40%"
                        backgroundColor="#B3B3B3"
                        title="Cancel"
                        alignItems="center"
                        justifyContent="center"
                        marginRight="5%"
                        borderRadius="25%"
                        href="Profile"
                        titleStyle={[styles.boldtext, { color: "white" }]}
                    />


                    <Button
                        width="50%"
                        height="40%"
                        backgroundColor="#3F72AF"
                        title="Save"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="25%"
                        href="Chat"
                        titleStyle={[styles.boldtext, { color: "white" }]}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}