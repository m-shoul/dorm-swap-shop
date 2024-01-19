import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    //Image,
    Animated,
    RefreshControl,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Modal,
    Pressable
} from "react-native";
import { Image } from 'expo-image';
import React, { useState, useEffect, useRef, useMemo } from "react";
import { getAllListings } from "../../backend/api/listing";
import styles from "../(aux)/StyleSheet";
import ListingPopup from "../../components/ListingPopup";
import { ScrollView } from "react-native-web";
//import styles from "../styleSheets/StyleSheet.js";
//import { HeaderComponent } from "../components/headerComponent.js";
import filter from "lodash.filter";
import typescript from "react-native-svg";
// import { get, child, ref, set, push } from "firebase/database";
import SearchBarHeader from "../../components/SearchBar";
import { getUsernameByID } from "../../backend/api/user";
import FilterPopup from "../../components/FilterPopup";

export default function HomeScreen() {
    const scrollOffsetY = useRef(new Animated.Value(0)).current;

    const [isLoading, setIsLoading] = useState(false); // State to track if the listings are loading
    const [listingsData, setListingsData] = useState([]); // State to store listings data
    const [error, setError] = useState(null); // State to track errors
    const [fullData, setFullData] = useState([]); // State to store the full listings data

    const [selectedListing, setSelectedListing] = useState(null); // State to store the selected listing
    const [refreshing, setRefreshing] = useState(false);

    let timerId;

    const fetchListings = async () => {
        clearTimeout(timerId);
        timerId = setTimeout(async () => {
            setRefreshing(true);
            try {
                const listingsData = await getAllListings();
                setFullData(listingsData);
                setListingsData(listingsData);
                console.log("***IN APP - Home.js*** Got all listings.");
                setRefreshing(false);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                console.error('Error:', error);
                setRefreshing(false);
                setIsLoading(false);
            }
        }, 1000); // Delay of 1 second
    }

    useEffect(() => {
        // Fetch listings data from Firebase when the component mounts
        setIsLoading(true);
        fetchListings();
        return () => {
            clearTimeout(timerId);
        };
    }, []);

    const memoizedListingsData = useMemo(() => Object.values(listingsData), [listingsData]);

    console.log("***IN APP - Home.js*** - Printing out listings.");
    console.log(memoizedListingsData);

    const handleSearch = async (query) => {
        if (typeof fullData !== 'object') {
            console.error('fullData is not an object:', fullData);
            return;
        }
        const formattedQuery = query.toLowerCase();
        const filteredData = await Promise.all(Object.values(fullData).map(async (listing) => {
            const username = await getUsernameByID(listing.user);
            if (username && contains(listing, formattedQuery, username.toLowerCase())) {
                return listing;
            }
        }));
        setListingsData(filteredData.filter(Boolean)); // Remove undefined values
    }

    const contains = ({ title, description, condition, category }, query, username) => {
        title = title.toLowerCase();
        description = description.toLowerCase();
        category = category.toLowerCase();

        if (title.includes(query) || description.includes(query) || condition.includes(query) || username.includes(query) || category.includes(query)) {
            return true;
        }
        return false;
    }

    const handleItemPress = (listing) => {
        setSelectedListing(listing);
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#112d4e" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Error fetching listings: {error}
                </Text>
                {/* remove error details in full release */}
            </View>
        );
    }

    const minScroll = 300;

    const animHeaderValue = scrollOffsetY;

    const headerHeight = 120;
    const activeRange = 200;


    const diffClamp = Animated.diffClamp(animHeaderValue, -minScroll,
        activeRange + minScroll);
    const animatedHeaderHeight = diffClamp.interpolate({
        inputRange: [0, activeRange],
        outputRange: [0, -headerHeight],
        extrapolate: "clamp"
    })

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F7F7" }}>
            <Animated.View style={{
                zIndex: 1,
                transform: [{ translateY: animatedHeaderHeight }]
            }}>
                <View style={{
                    flexDirection: "row", alignItems: "center", width: "100%", paddingHorizontal: "2%",
                    position: "absolute", top: 0, left: 0, right: 0
                }}>
                    <View style={{ justifyContent: "center", width: "90%" }}>
                        <SearchBarHeader handleSearch={handleSearch} />
                    </View>
                    <View style={{ width: "10%" }}>
                        <FilterPopup />
                    </View>

                </View>
            </Animated.View>

            {/* Scrollable view displaying all the listings */}
            <FlatList
                data={Object.values(memoizedListingsData)}
                keyExtractor={(item) => item.listingId}
                renderItem={({ item }) => (
                    <View style={{ width: "50%", height: 230, padding: "1%" }}>
                        <ListingPopup
                            listing={item}
                        //navigation={router}
                        />
                    </View>
                )}
                numColumns={2}
                style={{
                    flex: 1,
                    backgroundColor: "#F9F7F7",
                    paddingTop: "15%",
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                    { useNativeDriver: false }
                )}
                bounces={true}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={fetchListings}
                    />
                }
                scrollEventThrottle={10}
            />
        </SafeAreaView>
    );
}
