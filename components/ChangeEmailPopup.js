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
import { updateOldEmail } from "../backend/api/user.js";
import { router } from "expo-router";

export default function ChangeEmail() {
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");

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
            case "email":
                setEmail(filteredValue);
                break;
            case "newEmail":
                setNewEmail(filteredValue);
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
                <Ionicons name="mail-outline" size={32} color="black" />
                <Text
                    style={[
                        styles.normaltext,
                        { marginTop: 7, paddingLeft: "2%" },
                    ]}>
                    Change Email
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
                                <Text style={styles.postListingHeader}>Change Email</Text>
                            </View>

                            <View>
                                <Text style={[styles.normaltext, { marginBottom: 5 }]}>Current Email: </Text>
                                <TextInput
                                    style={styles.createUserInput}
                                    value={email}
                                    onChangeText={(value) => {
                                        if (value.trim().length > 0) {
                                            filterOutBadWords("email", value);
                                        } else {
                                            setEmail("");
                                        }
                                    }}
                                    placeholder="Enter your current email"
                                    placeholderTextColor="#585858"
                                />
                                <Text style={[styles.normaltext, { marginBottom: 5 }]}>New Email: </Text>
                                <TextInput
                                    style={styles.createUserInput}
                                    value={newEmail}
                                    onChangeText={(value) => {
                                        if (value.trim().length > 0) {
                                            filterOutBadWords("newEmail", value);
                                        } else {
                                            setNewEmail("");
                                        }
                                    }}
                                    placeholder="Enter your new email"
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
                                        updateOldEmail(email, newEmail);
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