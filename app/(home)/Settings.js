import { Text, View, TouchableOpacity, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import styles from "../(aux)/StyleSheet.js";
import { router } from "expo-router";
import { logoutUser } from "../../backend/dbFunctions.js";
import RoundHeader from "../../components/RoundHeader";
import SettingsLogo from "../../assets/svg/settings_logo.js";
import { ShadowedView } from 'react-native-fast-shadow';
import ChangeEmail from "../../components/ChangeEmailPopup.js";
import ChangePassword from "../../components/ChangePasswordPopup.js";

// New icons
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
    return (
        <SafeAreaView style={styles.background}>
            <RoundHeader height={220} />
            <View style={{ marginTop: "10%", marginBottom: "10%" }}>
                <Text style={[styles.postListingHeader, { color: styles.colors.lightColor }]}>Settings</Text>
            </View>

            <ShadowedView
                style={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    shadowOpacity: 0.8,
                    shadowRadius: 20,
                    shadowOffset: {
                        width: 5,
                        height: 3,
                    },
                }}
            >

                <SettingsLogo />
            </ShadowedView>




            {/* <View
                style={{
                    marginTop: "5%",
                    height: "5%",
                    width: "100%",
                    marginBottom: "15%",
                }}>
                <SearchBarHeader animHeaderValue={animHeaderValue} handleSearch={handleSearch} />
            </View> */}
            <View style={{ width: "100%" }}>
                <View style={{ flexDirection: "row", marginLeft: "5%" }}>
                    <TouchableOpacity
                        //onPress={() => router.push("(settings)/DeleteAccountScreen")}
                        style={{
                            marginBottom: "5%",
                            marginTop: "3%",
                            flexDirection: "row",
                        }}>
                        <Ionicons
                            name="notifications-outline"
                            size={32}
                            color="black"
                        />
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
                        <Ionicons
                            name="information-circle-outline"
                            size={32}
                            color="black"
                        />
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
                    <ChangeEmail />
                </View>
                <View
                    style={[
                        styles.dividerLine,
                        { width: "83%", marginLeft: "7%" },
                    ]}
                />
                <View style={{ flexDirection: "row", marginLeft: "5%" }}>
                    <ChangePassword />
                </View>
                <View
                    style={[
                        styles.dividerLine,
                        { width: "83%", marginLeft: "7%" },
                    ]}
                />
                <View style={{ flexDirection: "row", marginLeft: "5%" }}>
                    <TouchableOpacity
                        onPress={() => {
                            logoutUser();
                            router.push("/");
                        }}
                        style={{
                            marginBottom: "5%",
                            marginTop: "-3%",
                            flexDirection: "row",
                        }}>
                        <Ionicons
                            name="log-out-outline"
                            size={32}
                            color="black"
                        />
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
                        onPress={() =>
                            router.push("(settings)/DeleteAccountScreen")
                        }
                        style={{
                            marginBottom: "5%",
                            marginTop: "-3%",
                            flexDirection: "row",
                        }}>
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
}
