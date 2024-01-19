import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StyleSheet,
    //Image,
    Modal,
    Animated,
} from "react-native";
import { Image } from 'expo-image';
import { router } from "expo-router";
import ListingPopup from "../../components/ListingPopup.js";
import React, { useState, useEffect } from "react";
import { SearchBar, Header } from "@rneui/themed";
import styles from "../(aux)/StyleSheet.js";
import BackButtonComponent from "../../assets/svg/back_button.js";
import ProfileScreen from "./Profile.js";
import SearchBarHeader from "../../components/SearchBar.js";
import { getUserListings } from "../../backend/api/listing.js";
import filter from "lodash.filter";

//This is now the my listings screen
const MyListingsScreen = ({ navigation }) => {
    const animHeaderValue = new Animated.Value(0);
    const [search, setSearch] = useState("");
    const [selectedListing, setSelectedListing] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const [listingsData, setListingsData] = useState([]);
    const [fullData, setFullData] = useState([]);

    useEffect(() => {
        const fetchListingData = async () => {
            try {
                const listingsData = await getUserListings();
                setFullData(listingsData);
                setListingsData(listingsData);
                console.log("Got user listings.");
            } catch (error) {
                console.error("Could not get user listings: ", error);
            }
        };
        fetchListingData();
    }, []);

    const handleItemPress = (listing) => {
        setSelectedListing(listing);
    };

    if (showProfile) {
        return <ProfileScreen />;
    }

    const handleSearch = (query) => {
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(fullData, (listingsData) => {
            return contains(listingsData, formattedQuery);
        });
        setListingsData(filteredData);
    };

    const contains = ({ title, description, condition }, query) => {
        title = title.toLowerCase();
        description = description.toLowerCase();

        if (
            title.includes(query) ||
            description.includes(query) ||
            condition.includes(query)
        ) {
            return true;
        }
        return false;
    };

    // const listingDescription =
    //     description.length > 22
    //         ? description.substring(0, 14) + "..."
    //         : description;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F7F7" }}>
            {/* Search bar was taken from homescreen, so will not have functionality. */}
            <View style={{ flexDirection: "row", alignItems: "center", width: "100%", paddingHorizontal: "5%" }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <BackButtonComponent></BackButtonComponent>
                </TouchableOpacity>

                <View style={{ justifyContent: "center", flex: 1 }}>
                    <Text style={styles.loginHeader}>My Listings</Text>
                </View>
            </View>
            <View
                style={{
                    height: "5%",
                    width: "100%",
                    marginBottom: "5%",
                }}>
                <SearchBarHeader
                    animHeaderValue={animHeaderValue}
                    handleSearch={handleSearch}
                />
            </View>
            <FlatList
                data={listingsData}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            width: 400,
                            marginTop: 20,
                            padding: 10,

                            flex: 1,
                            margin: 0,
                        }}
                        onPress={() => handleItemPress(item)}
                        key={item.id}>
                        <View
                            style={{
                                backgroundColor: "#F9F7F7",
                                flex: 1,
                                flexDirection: "row",
                                padding: 2,
                                paddingRight: "5%",
                                width: 370,
                                justifyContent: "space-between",
                            }}>
                            {Array.isArray(item.images) ? (
                                <Image
                                    source={{ uri: item.images[0] }}
                                    style={{ width: 100, height: 100 }}
                                />
                            ) : (
                                <Image
                                    source={{ uri: item.images }}
                                    style={{ width: 100, height: 100 }}
                                />
                            )}

                            <View style={{ flex: 1, marginLeft: "3%" }}>
                                <Text style={styles.boldtext}>
                                    {item.title}
                                </Text>
                                <Text>{"$" + item.price}</Text>
                                <Text>{item.condition}</Text>
                                <Text>{item.description}</Text>
                            </View>
                        </View>

                        {/* For now this is commented out since the listing popup is broken */}
                        {/* <ListingPopup listing={item} navigation={navigation} /> */}
                        <View
                            style={{
                                backgroundColor: "#B3B3B3",
                                height: 1,
                                marginTop: 20,
                                marginLeft: 10,
                                marginRight: 20,
                                marginBottom: -20,
                            }}
                        />
                    </TouchableOpacity>
                )}
                //numColumns={2}
                keyExtractor={(item) => item.listingId}
                style={{
                    flex: 1,
                    backgroundColor: "#F9F7F7",
                    marginTop: 10,
                }}
                //kept causing errors, so turned it off
                // onScroll={(e) => {
                //     scrollY.setValue(e.nativeEvent.contentOffset.y);
                // }}
                bounces={false}
            />
        </SafeAreaView>
    );
};

export default MyListingsScreen;
