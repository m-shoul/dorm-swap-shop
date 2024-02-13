import {
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Modal,
    Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { SwipeListView } from "react-native-swipe-list-view";
import ReportComponent from "../../assets/svg/report_icon.js";
import TrashButtonComponent from "../../assets/svg/trash_button.js";

// New icons
import { Ionicons } from '@expo/vector-icons';


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
        //setSelectedListing(listing);
        router.push({
            pathname: "EditListingScreen",
            params: { listingTitle: listing.title },
        });
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
    const truncatedDescription =
        listingsData.description && listingsData.description.length > 10
            ? listingsData.description.substring(0, 35) + "..."
            : listingsData.description;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: styles.colors.lightColor }}>
            {/* Search bar was taken from homescreen, so will not have functionality. */}
            <SquareHeader height={80} />
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
                        {/* <BackButtonComponent></BackButtonComponent> */}
                        <Ionicons name="chevron-back" size={32} color="white" />
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
            <SwipeListView
                data={listingsData}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                    { useNativeDriver: false }
                )}
                bounces={true}
                renderItem={({ item }) => {
                    return (
                        <TouchableWithoutFeedback
                            onPress={() => handleItemPress(item)}
                            key={item.id}>
                            <View
                                style={{
                                    backgroundColor: styles.colors.lightColor,
                                    flex: 1,
                                    flexDirection: "row",
                                    padding: 2,
                                    //paddingRight: "5%",
                                    //width: 370,
                                    //justifyContent: "space-between",
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

                                {/* For now this is commented out since the listing popup is broken */}
                                {/* <ListingPopup listing={item} navigation={navigation} /> */}
                            </View>
                        </TouchableWithoutFeedback>
                    );
                }}
                ItemSeparatorComponent={() => (
                    <View style={{ alignItems: "center" }}>
                        <View style={[styles.dividerLine, { marginBottom: 10, marginTop: 10 }]} />
                    </View>
                )}
                renderHiddenItem={({ item }) => (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            // marginBottom: "6%",
                            // marginTop: "1%",
                            // marginRight: "4%",
                        }}>
                        <TouchableOpacity
                            style={{
                                width: 75,
                                backgroundColor: "#FF9900",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => {
                                // Handle the "Report" action
                                router.push({
                                    pathname: "EditListingScreen",
                                    params: { image: item.images },
                                });
                            }}>
                            <Ionicons name="pencil" size={24} color="black" />
                            {/* <ReportComponent width="50%" height="50%" /> */}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 75,
                                backgroundColor: "#F30000",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => {
                                // Handle the "Delete" action
                                alert("Listing will be deleted");
                            }}>
                            {/* <TrashButtonComponent width="40%" height="40%" /> */}
                            <Ionicons name="trash-outline" size={32} color="black" />
                        </TouchableOpacity>
                    </View>
                )}
                disableRightSwipe={true}
                rightOpenValue={-150}
                keyExtractor={(item) => item.listingId}
                contentContainerStyle={{
                    paddingBottom: "15%", // Add this line
                }}
                scrollEventThrottle={10}
                style={{
                    flex: 1,
                    backgroundColor: styles.colors.lightColor,
                    paddingTop: 85,
                }}
            />
        </SafeAreaView>
    );
};

export default MyListingsScreen;
