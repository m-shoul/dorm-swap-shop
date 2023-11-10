import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../(aux)/StyleSheet.js";
import { SearchBar } from "@rneui/themed";
import { router } from "expo-router";
import NotificationComponent from "../../assets/svg/notification_icon.js";
import SupportComponent from "../../assets/svg/support_icon.js";
import AboutComponent from "../../assets/svg/about_icon.js";
import LogoutComponent from "../../assets/svg/logout_icon.js";
import DeleteComponent from "../../assets/svg/delete_icon.js";

const SettingsScreen = ({ navigation }) => {
    const [search, setSearch] = useState("");
    return (
        <SafeAreaView style={styles.background}>
            <View style={{ marginTop: "30%" }}>
                <Text style={styles.postListingHeader}>Settings</Text>
            </View>
            <View
                style={{
                    marginTop: "5%",
                    height: "5%",
                    width: "100%",
                    marginBottom: "5%",
                }}>
                <SearchBar
                    round
                    searchIcon={{ size: 24, color: "black" }}
                    containerStyle={styles.searchContainer}
                    inputStyle={{ backgroundColor: "#fff" }}
                    inputContainerStyle={{
                        backgroundColor: "#fff",
                        borderRadius: 40,
                        borderWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: "#B3B3B3",
                    }}
                    onChangeText={setSearch}
                    //onClear={(text) => searchFilterFunction("")}
                    placeholder="Search"
                    value={search}
                />
            </View>
            <View style={{ width: "100%" }}>
                <View style={{ flexDirection: "row", marginLeft: "5%" }}>
                    <TouchableOpacity
                        onPress={() => router.push("DeleteAccount")}
                        style={{
                            marginBottom: "5%",
                            marginTop: "3%",
                            flexDirection: "row",
                        }}>
                        <NotificationComponent
                            style={{
                                stroke: "black",
                                strokeWidth: 0.25,
                            }}
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
                        onPress={() => router.push("DeleteAccount")}
                        style={{
                            marginBottom: "5%",
                            marginTop: "-3%",
                            flexDirection: "row",
                        }}>
                        <SupportComponent
                            style={{
                                stroke: "black",
                                strokeWidth: 0.25,
                            }}
                        />

                        <Text
                            style={[
                                styles.normaltext,
                                { marginTop: 7, paddingLeft: "2%" },
                            ]}>
                            Help and Support
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
                        onPress={() => router.push("DeleteAccount")}
                        style={{
                            marginBottom: "5%",
                            marginTop: "-3%",
                            flexDirection: "row",
                        }}>
                        <AboutComponent
                            style={{
                                stroke: "black",
                                strokeWidth: 0.25,
                            }}
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
                    <TouchableOpacity
                        onPress={() => router.push("DeleteAccount")}
                        style={{
                            marginBottom: "5%",
                            marginTop: "-3%",
                            flexDirection: "row",
                        }}>
                        <LogoutComponent
                            style={{
                                stroke: "black",
                                strokeWidth: 0.25,
                                paddingRight: 10,
                            }}
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
                        onPress={() => router.push("DeleteAccount")}
                        style={{
                            marginBottom: "5%",
                            marginTop: "-3%",
                            flexDirection: "row",
                        }}>
                        <DeleteComponent
                            style={{
                                stroke: "black",
                                strokeWidth: 0.25,
                            }}
                        />

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