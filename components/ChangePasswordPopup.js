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

export default function ChangePassword() {
    const [modalVisible, setModalVisible] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
            case "confirmPassword":
                setConfirmPassword(filteredValue);
                break;
            default:
                break;
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
                        }}>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.postListingHeader}>Change Password</Text>
                            </View>

                            <View style={styles.forms}>
                                <Text style={[styles.normaltext, { marginBottom: 5 }]}>New Password: </Text>
                                <TextInput
                                    style={styles.createUserInput}
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
                                <Text style={[styles.normaltext, { marginBottom: 5 }]}>Confirm Password: </Text>
                                <TextInput
                                    style={styles.createUserInput}
                                    value={confirmPassword}
                                    onChangeText={(value) => {
                                        if (value.trim().length > 0) {
                                            filterOutBadWords("confirmPassword", value);
                                        } else {
                                            setConfirmPassword("");
                                        }
                                    }}
                                    placeholder="Re-enter your new password"
                                    placeholderTextColor="#585858"
                                />
                            </View>

                            <View>
                                <Button
                                    //width="40%"
                                    backgroundColor={styles.colors.darkAccentColor}
                                    title="Submit"
                                    alignItems="center"
                                    justifyContent="center"
                                    borderRadius={25}
                                    press={() => {
                                        setModalVisible(!modalVisible)
                                        router.push("/");
                                    }}
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