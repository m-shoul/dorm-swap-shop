import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styleSheets/StyleSheet.js";
import { SearchBar } from "@rneui/themed";

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

            <TouchableOpacity
                onPress={() => navigation.navigate("DeleteAccount")}
                style={{ marginBottom: "5%" }}>
                <Text style={[styles.normaltext, { textAlign: "left" }]}>
                    Notifications
                </Text>
            </TouchableOpacity>
            <View style={styles.dividerLine} />
            <TouchableOpacity
                style={{ marginBottom: "5%" }}
                onPress={() => navigation.navigate("DeleteAccount")}>
                <Text style={styles.normaltext}>Help and Support</Text>
            </TouchableOpacity>
            <View style={styles.dividerLine} />
            <TouchableOpacity
                style={{ marginBottom: "5%" }}
                onPress={() => navigation.navigate("DeleteAccount")}>
                <Text style={styles.normaltext}>About</Text>
            </TouchableOpacity>
            <View style={styles.dividerLine} />
            <TouchableOpacity
                style={{ marginBottom: "5%" }}
                onPress={() => navigation.navigate("DeleteAccount")}>
                <Text style={styles.normaltext}>Logout</Text>
            </TouchableOpacity>
            <View style={styles.dividerLine} />

            <TouchableOpacity
                style={{ marginBottom: "5%" }}
                onPress={() => navigation.navigate("DeleteAccount")}>
                <Text style={styles.normaltext}>Delete Account</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default SettingsScreen;
