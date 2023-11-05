import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Image } from "react-native";
import styles from "../(aux)/StyleSheet";
import { get, ref, getDatabase } from "@firebase/database";
import { getUserID } from "../../backend/dbFunctions.js";
import React, { useState, useEffect } from "react";
import ListingPopup from "../../components/ListingPopup.js";


const ProfileScreen = ({ navigation }) => {
    const [listingsData, setListingsData] = useState([]);

    const db = getDatabase();
    // const listingsReference = ref(db, 'dorm_swap_shop/users/' + getUserID() + 'listings/');
    const listingsReference = ref(db, 'dorm_swap_shop/listings/');

    const fetchListings = () => {
        get(listingsReference)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const listingsData = snapshot.val();
                    // Set the retrieved data to the state
                    setListingsData(listingsData);
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching listings:", error);
            });
    };

    const handleItemPress = (listing) => {
        // setSelectedListing(listing);
    }

    useEffect(() => {
        // Fetch listings data from Firebase when the component mounts
        fetchListings();
    }, []);

    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>Profile</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}>
                <Text>Home</Text>
            </TouchableOpacity>

            {/* Scrollable view displaying all the listings */}
            <FlatList
                data={Object.values(listingsData)}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ width: "50%", height: 200, padding: "1%" }}
                        onPress={() => handleItemPress(item)}
                        key={item.id}
                    >
                        <View style={{ backgroundColor: "white", flex: 1 }}>
                            {/* Source might be something like source={{uri: item.images}} */}
                            <Image source={require("../../assets/expo/splash_screen_dark.png")} style={{ width: "100%", height: "80%" }} />
                            <View style={{ backgroundColor: "#B3B3B3", height: 1, width: "100%", marginBottom: "5%" }} />
                            <Text>{"$" + item.price + " - " + item.title}</Text>
                        </View>
                        <ListingPopup
                            listing={item}
                            navigation={navigation}
                        />
                    </TouchableOpacity>
                )}
                numColumns={2}
                keyExtractor={(item) => item.id}
                style={{ flex: 1, backgroundColor: "#F9F7F7", paddingTop: "5%" }}
                onScroll={(e) => {
                    // scrollY.setValue(e.nativeEvent.contentOffset.y);
                }}
                bounces={false}
            />

        </SafeAreaView>
    );
};

export default ProfileScreen;