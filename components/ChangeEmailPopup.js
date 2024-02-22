import {
    Text,
    TextInput,
    View,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native";
import React, { useState, useRef } from "react";
import styles from "../app/(aux)/StyleSheet";
import { Button } from "./Buttons";
import { Ionicons } from "@expo/vector-icons";
import { RegExpMatcher, TextCensor, englishDataset, englishRecommendedTransformers, asteriskCensorStrategy } from "obscenity";

export default function ChangeEmail() {
    const [modalVisible, setModalVisible] = useState(false);
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
                            backgroundColor: '#F9F7F7',
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
                                <Text style={styles.postListingHeader}>Change Email</Text>
                            </View>

                            <View style={styles.forms}>
                                <Text style={[styles.normaltext, { marginBottom: 5 }]}>Current Email: </Text>
                                <TextInput
                                    style={styles.createUserInput}
                                    placeholder="Enter your current email"
                                    placeholderTextColor="black"
                                />
                                <Text style={[styles.normaltext, { marginBottom: 5 }]}>New Email: </Text>
                                <TextInput
                                    style={styles.createUserInput}
                                    placeholder="Enter new email"
                                    placeholderTextColor="black"
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
                                    press={() => setModalVisible(!modalVisible)}
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