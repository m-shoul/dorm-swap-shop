import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import styles from "../(aux)/StyleSheet.js";
import { router } from "expo-router";
import { logoutUser } from "../../backend/dbFunctions.js";
import RoundHeader from "../../components/RoundHeader";
import SettingsLogo from "../../assets/svg/settings_logo.js";
import { ShadowedView } from "react-native-fast-shadow";
import ChangeEmail from "../../components/ChangeEmailPopup.js";
import ChangePassword from "../../components/ChangePasswordPopup.js";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
    return (
        <SafeAreaView style={styles.background}>
            <RoundHeader height={220} />
            <View style={{ marginBottom: "6%" }}>
                <Text
                    style={[
                        styles.loginHeader,
                        { color: styles.colors.lightColor },
                    ]}>
                    Settings
                </Text>
            </View>

            {Platform.OS === "ios" ? (
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
                    }}>
                    <SettingsLogo />
                </ShadowedView>
            ) : (
                <View style={{ backgroundColor: "white", borderRadius: 20 }}>
                    <SettingsLogo />
                </View>
            )}

            <View style={{ width: "100%" }}>
                <View style={{ marginLeft: "5%", marginBottom: "2%", marginTop: "3%", }}>
                    <TouchableOpacity
                        onPress={() => router.push("(settings)/AboutScreen")}
                        style={{
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
                <View style={{ marginLeft: "5%", marginBottom: "2%", marginTop: "-3%" }}>
                    <ChangeEmail />
                </View>
                <View
                    style={[
                        styles.dividerLine,
                        { width: "83%", marginLeft: "7%" },
                    ]}
                />
                <View style={{ marginLeft: "5%", marginBottom: "2%", marginTop: "-3%" }}>
                    <ChangePassword />
                </View>
                <View
                    style={[
                        styles.dividerLine,
                        { width: "83%", marginLeft: "7%" },
                    ]}
                />
                <View style={{ marginLeft: "5%", marginBottom: "2%", marginTop: "-3%", }}>
                    <TouchableOpacity
                        onPress={() => {
                            logoutUser();
                            router.push("/");
                        }}
                        style={{
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
                <View style={{ marginLeft: "5%", marginBottom: "5%", marginTop: "-3%", }}>
                    <TouchableOpacity
                        onPress={() =>
                            router.push("(settings)/DeleteAccountScreen")
                        }
                        style={{
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
