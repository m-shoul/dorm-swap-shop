import {
    Text,
    TextInput,
    View,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native";
import React, { useState } from "react";
import styles from "../app/(aux)/StyleSheet";
import { Button } from "./Buttons";
import { Ionicons } from "@expo/vector-icons";
import { RegExpMatcher, TextCensor, englishDataset, englishRecommendedTransformers, asteriskCensorStrategy } from "obscenity";
import { router } from "expo-router";
import { updateOldPassword } from "../backend/api/user";

export default function ChangePassword() {
    const [modalVisible, setModalVisible] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage2, setErrorMessage2] = useState("");
    const [newPasswordStyle, setNewPasswordStyle] = useState(styles.createUserInput);
    const [currentPasswordStyle, setCurrentPasswordStyle] = useState(styles.createUserInput);

    // Obscenity - filtering out inappropriate text
    const matcher = new RegExpMatcher({
        ...englishDataset.build(),
        ...englishRecommendedTransformers,
    });
    const censor = new TextCensor().setStrategy(asteriskCensorStrategy());
    const filterOutBadWords = (fieldName, value) => {
        const matches = matcher.getAllMatches(value);
        const filteredValue = censor.applyTo(value, matches);
        switch (fieldName) {
            case "newPassword":
                setNewPassword(filteredValue);
                break;
            case "currentPassword":
                setCurrentPassword(filteredValue);
                break;
            default:
                break;
        }
    };

    const handlePasswordChange = async () => {
        //Check that user fills out form
        if (!newPassword && !currentPassword) {
            setErrorMessage("Form Empty");
            setErrorMessage2("Form Empty");
            setNewPasswordStyle(styles.createUserInputError);
            setCurrentPasswordStyle(styles.createUserInputError);
        } else if (!newPassword) {
            setErrorMessage("");
            setErrorMessage2("New Password Empty");
            setNewPasswordStyle(styles.createUserInputError);
            setCurrentPasswordStyle(styles.createUserInput);
        } else if (!currentPassword) {
            setErrorMessage("Current Password Empty");
            setErrorMessage2("");
            setCurrentPasswordStyle(styles.createUserInputError);
            setNewPasswordStyle(styles.createUserInput);
        } else if (newPassword && currentPassword) {
            try {
                updateOldPassword(newPassword, currentPassword)
                router.push("/");
                setModalVisible(!modalVisible)
                setErrorMessage("");
                setErrorMessage2("");
                setNewPasswordStyle(styles.createUserInput);
                setCurrentPasswordStyle(styles.createUserInput);
            } catch (error) {
                setErrorMessage("Invalid Password");
                setErrorMessage2("Invalid Password");
                setNewPasswordStyle(styles.createUserInputError);
                setCurrentPasswordStyle(styles.createUserInputError);
            }
        }
    };

    return (
        <View>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                    marginBottom: "5%",
                    marginTop: "-3%",
                    flexDirection: "row",
                }}>
                <Ionicons
                    name="lock-closed-outline"
                    size={32}
                    color="black"
                />
                <Text
                    style={[
                        styles.normaltext,
                        { marginTop: 7, paddingLeft: "2%" },
                    ]}>
                    Change Password
                </Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: 'center',
                    }}>
                        <View style={{
                            backgroundColor: "#F9F7F7",
                            borderRadius: 20,
                            padding: 20,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                            width: "90%",
                            height: 450,
                            justifyContent: "center",
                        }}>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.postListingHeader}>Change Password</Text>
                            </View>

                            <View>
                                <Text style={[styles.normaltext, { marginBottom: 5 }]}>Current Password: </Text>
                                <TextInput
                                    style={currentPasswordStyle}
                                    secureTextEntry={true}
                                    value={currentPassword}
                                    onChangeText={(value) => {
                                        if (value.trim().length > 0) {
                                            filterOutBadWords("currentPassword", value);
                                        } else {
                                            setCurrentPassword("");
                                        }
                                    }}
                                    placeholder="Enter your current password"
                                    placeholderTextColor="#585858"
                                />
                                {errorMessage && (
                                    <Text style={{ color: "red", paddingBottom: 20 }}>
                                        {errorMessage}
                                    </Text>
                                )}
                                <Text style={[styles.normaltext, { marginBottom: 5 }]}>New Password: </Text>
                                <TextInput
                                    style={newPasswordStyle}
                                    secureTextEntry={true}
                                    value={newPassword}
                                    onChangeText={(value) => {
                                        if (value.trim().length > 0) {
                                            filterOutBadWords("newPassword", value);
                                        } else {
                                            setNewPassword("");
                                        }
                                    }}
                                    placeholder="Enter your new password"
                                    placeholderTextColor="#585858"
                                />
                                {errorMessage2 && (
                                    <Text style={{ color: "red", paddingBottom: 20 }}>
                                        {errorMessage2}
                                    </Text>
                                )}
                            </View>

                            <View>
                                <Button
                                    //width="40%"
                                    backgroundColor={styles.colors.darkAccentColor}
                                    title="Submit"
                                    alignItems="center"
                                    justifyContent="center"
                                    borderRadius={25}
                                    press={handlePasswordChange}
                                    titleStyle={styles.buttonText}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}