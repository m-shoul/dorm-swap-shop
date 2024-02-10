import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Animated
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import styles from "../(aux)/StyleSheet.js";
import { router } from "expo-router";
import { logoutUser } from "../../backend/dbFunctions.js";
import NotificationComponent from "../../assets/svg/notification_icon.js";
import AboutComponent from "../../assets/svg/about_icon.js";
import LogoutComponent from "../../assets/svg/logout_icon.js";
import DeleteComponent from "../../assets/svg/delete_icon.js";
import SearchBarHeader from "../../components/SearchBar";
import RoundHeader from "../../components/RoundHeader";

// New icons
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';


export default function SettingsScreen() {
    const animHeaderValue = new Animated.Value(0);
    const [search, setSearch] = useState("");
    const handleSearch = () => { null }
    return (
        <SafeAreaView style={styles.background}>
            <RoundHeader height={"25%"} />
            <View style={{ marginTop: "10%", marginBottom: "20%" }}>
                <Text style={[styles.postListingHeader, { color: styles.colors.lightColor }]}>Settings</Text>
            </View>
            <View
                style={{
                    marginTop: "5%",
                    height: "5%",
                    width: "100%",
                    marginBottom: "15%",
                }}>
                <SearchBarHeader animHeaderValue={animHeaderValue} handleSearch={handleSearch} />
            </View>

            <View style={{ width: "100%" }}>
                <View style={{ flexDirection: "row", marginLeft: "5%" }}>
                    <TouchableOpacity
                        //onPress={() => router.push("(settings)/DeleteAccountScreen")}
                        style={{
                            marginBottom: "5%",
                            marginTop: "3%",
                            flexDirection: "row",
                        }}>
                        {/* <NotificationComponent
                            style={{
                                stroke: "black",
                                strokeWidth: 0.25,
                            }}
                        /> */}
                        <Ionicons name="notifications-outline" size={32} color="black" />
                        <Text
                            style={[
                                styles.normaltext,
                                { marginTop: 7, paddingLeft: "2%" },
                            ]}>
                            Notifications
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={[
                        styles.dividerLine,
                        { width: "83%", marginLeft: "7%" },
                    ]}
                />
                <View style={{ flexDirection: "row", marginLeft: "5%" }}>
                    <TouchableOpacity
                        onPress={() => router.push("(settings)/AboutScreen")}
                        style={{
                            marginBottom: "5%",
                            marginTop: "-3%",
                            flexDirection: "row",
                        }}>
                        {/* <AboutComponent
                            style={{
                                stroke: "black",
                                strokeWidth: 0.25,
                            }}
                        /> */}
                        <Ionicons name="information-circle-outline" size={32} color="black" />
                        <Text
                            style={[
                                styles.normaltext,
                                { marginTop: 7, paddingLeft: "2%" },
                            ]}>
                            About
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={[
                        styles.dividerLine,
                        { width: "83%", marginLeft: "7%" },
                    ]}
                />
                <View style={{ flexDirection: "row", marginLeft: "5%" }}>
                    <TouchableOpacity
                        onPress={() => { logoutUser(); router.push("/"); }}
                        style={{
                            marginBottom: "5%",
                            marginTop: "-3%",
                            flexDirection: "row",
                        }}>
                        {/* <LogoutComponent
                            style={{
                                stroke: "black",
                                strokeWidth: 0.25,
                                paddingRight: 10,
                            }}
                        /> */}
                        <Ionicons name="log-out-outline" size={32} color="black" />
                        <Text
                            style={[
                                styles.normaltext,
                                { marginTop: 7, paddingLeft: "2%" },
                            ]}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={[
                        styles.dividerLine,
                        { width: "83%", marginLeft: "7%" },
                    ]}
                />

                <View style={{ flexDirection: "row", marginLeft: "5%" }}>
                    <TouchableOpacity
                        onPress={() => router.push("(settings)/DeleteAccountScreen")}
                        style={{
                            marginBottom: "5%",
                            marginTop: "-3%",
                            flexDirection: "row",
                        }}>
                        {/* <DeleteComponent
                            style={{
                                stroke: "black",
                                strokeWidth: 0.25,
                            }}
                        /> */}
                        {/* Can change this to trashcan lol */}
                        <Ionicons name="skull-outline" size={32} color="red" />

                        <Text
                            style={[
                                styles.normaltext,
                                { marginTop: 7, paddingLeft: "2%" },
                            ]}>
                            Delete Account
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};