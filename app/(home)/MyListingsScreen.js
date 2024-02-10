import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Modal,
    Animated,
} from "react-native";

import SquareHeader from "../../components/SquareHeader.js";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import styles from "../(aux)/StyleSheet.js";
import BackButtonComponent from "../../assets/svg/back_button.js";
import ProfileScreen from "./Profile.js";
import SearchBarHeader from "../../components/SearchBar.js";
import { getUserListings } from "../../backend/api/listing.js";
import filter from "lodash.filter";

//This is now the my listings screen
const MyListingsScreen = ({ navigation }) => {
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
                console.error("ERROR: Could not get user listings: ", error);
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
    const scrollOffsetY = useRef(new Animated.Value(0)).current;
    const handleSearch = (query) => {
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(fullData, (listingsData) => {
            return contains(listingsData, formattedQuery);
        });
        setListingsData(filteredData);
    };
    const minScroll = 300;

    const animHeaderValue = scrollOffsetY;

    const headerHeight = 120;
    const activeRange = 200;

    const diffClamp = Animated.diffClamp(
        animHeaderValue,
        -minScroll,
        activeRange + minScroll
    );
    const animatedHeaderHeight = diffClamp.interpolate({
        inputRange: [0, activeRange],
        outputRange: [0, -headerHeight],
        extrapolate: "clamp",
    });
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
        <SafeAreaView style={{ flex: 1, backgroundColor: styles.colors.lightColor }}>
            {/* Search bar was taken from homescreen, so will not have functionality. */}
            <SquareHeader height={"8%"} />
            <Animated.View
                style={{
                    zIndex: 1,
                    transform: [{ translateY: animatedHeaderHeight }],
                }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                        paddingHorizontal: "2%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: styles.colors.darkColor,
                    }}>
                    <TouchableOpacity onPress={() => router.push("Profile")}>
                        <BackButtonComponent></BackButtonComponent>
                    </TouchableOpacity>
                    <View style={{ justifyContent: "center", width: "90%" }}>
                        <SearchBarHeader handleSearch={handleSearch} />
                    </View>
                </View>
            </Animated.View>
            {/* <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: styles.colors.darkColor,
                    paddingHorizontal: "5%",
                }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <BackButtonComponent></BackButtonComponent>
                </TouchableOpacity>
                <View style={{ width: "95%" }}>
                    <SearchBarHeader
                        animHeaderValue={animHeaderValue}
                        handleSearch={handleSearch}
                    />
                </View>
            </View> */}
            <FlatList
                data={listingsData}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                    { useNativeDriver: false }
                )}
                bounces={true}
                renderItem={({ item }) => {
                    const truncatedDescription =
                        item.description && item.description.length > 10
                            ? item.description.substring(0, 35) + "..."
                            : item.description;

                    return (
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
                                    backgroundColor: styles.colors.lightColor,
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
                                    <Text>{truncatedDescription}</Text>
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
                    );
                }}
                //numColumns={2}
                keyExtractor={(item) => item.listingId}
                contentContainerStyle={{
                    paddingBottom: "15%", // Add this line
                }}
                scrollEventThrottle={10}
                style={{
                    flex: 1,
                    backgroundColor: styles.colors.lightColor,
                    marginTop: 10,
                    paddingTop: "15%",
                }}
                //kept causing errors, so turned it off
                // onScroll={(e) => {
                //     scrollY.setValue(e.nativeEvent.contentOffset.y);
                // }}
            />
        </SafeAreaView>
    );
};

export default MyListingsScreen;
