import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import React, { useState, useEffect } from "react";
import styles from "../(aux)/StyleSheet.js";
import RoundHeader from "../../components/RoundHeader";
import ListImagesComponent from "../../assets/svg/list_images.js";
import {
    getAllUserDataForProfile,
    uploadProfileImage,
    updateUser,
} from "../../backend/api/user.js";
import CachedImage from "expo-cached-image";
import { Button } from "../../components/Buttons.js";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

export default function EditProfile() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const fetchUserData = async () => {
        try {
            const user = await getAllUserDataForProfile();
            setUser(user);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const [profileImage, setProfileImage] = useState(null);
    const pickProfileImage = async () => {
        console.log("Picking profile image.");
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            selectionLimit: 1,
            aspect: [1, 1],
            quality: 0.1,
        });

        if (result.assets && result.assets.length > 0) {
            const selectedProfileImage = result.assets[0];
            setProfileImage(selectedProfileImage.uri);
            uploadProfileImage(selectedProfileImage.uri);
        }
    };

    useEffect(() => {
        fetchUserData().then(() => {
            setUsername(user?.public?.username);
            setFname(user?.public?.fname);
            setLname(user?.public?.lname);
            setIsLoading(false);
        });
    }, []);

    const profileImageUrl = user?.public?.profileImage;

    // console.log(user);
    console.log("on user page");

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.background}>
                <RoundHeader height={275} />
                <View
                    style={{
                        marginBottom: "5%",
                        alignItems: "center",
                        width: "100%",
                    }}>
                    <Text style={[styles.loginHeader, { color: styles.colors.lightColor }]}>
                        Edit Profile
                    </Text>

                    <View
                        style={[
                            styles.dividerLine,
                            { backgroundColor: "white" },
                        ]}
                    />

                    <TouchableOpacity onPress={pickProfileImage}>
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
                                <Image
                                    source={{ uri: profileImageUrl }}
                                    // cacheKey={`user-${user.id}-profileImage`}
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

                <ScrollView
                    automaticallyAdjustKeyboardInsets={true}
                    style={{
                        KeyboardAvoidingView: "enabled",
                    }}
                    keyboardShouldPersistTaps="handled">
                    <View>
                        <Text style={styles.boldtext}>First Name</Text>
                        <TextInput
                            style={styles.createUserInput}
                            onChangeText={(value) => setFname(value)}
                            placeholder={"First name"}
                            // onSubmitEditing={() => {
                            //     // Focus on the password input when the user submits the email input
                            //     passwordInputRef.current.focus();
                            // }}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View>
                        <Text style={styles.boldtext}>Last Name</Text>
                        <TextInput
                            style={styles.createUserInput}
                            onChangeText={(value) => setLname(value)}
                            placeholder={"Last name"}
                            // onSubmitEditing={() => {
                            //     // Focus on the password input when the user submits the email input
                            //     passwordInputRef.current.focus();
                            // }}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View>
                        <Text style={styles.boldtext}>Username</Text>
                        <TextInput
                            style={styles.createUserInput}
                            onChangeText={(value) => setUsername(value)}
                            placeholder={"Username"}
                            // onSubmitEditing={() => {
                            //     // Focus on the password input when the user submits the email input
                            //     passwordInputRef.current.focus();
                            // }}
                            blurOnSubmit={false}
                        />
                    </View>
                    {/* <View>
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
                </View> */}
                    {/* <View>
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
                </View> */}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}>
                        <Button
                            width="35%"
                            backgroundColor="#B3B3B3"
                            title="Cancel"
                            alignItems="center"
                            justifyContent="center"
                            marginRight="5%"
                            borderRadius={40}
                            href="Profile"
                            titleStyle={[styles.boldtext, { color: "white" }]}
                        />

                        <Button
                            width="50%"
                            backgroundColor={styles.colors.darkAccentColor}
                            title="Save"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius={40}
                            href="Profile"
                            press={() =>
                                updateUser(profileImage, username, fname, lname)
                            }
                            titleStyle={[styles.boldtext, { color: "white" }]}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
