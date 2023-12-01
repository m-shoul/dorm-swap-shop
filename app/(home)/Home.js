import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Image,
    Animated,
    RefreshControl,
    ActivityIndicator
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { getAllListings } from "../../backend/api/listing";
import styles from "../(aux)/StyleSheet";
//import { getAuth, signOut } from "firebase/auth";
import ListingPopup from "../../components/ListingPopup";
import { ScrollView } from "react-native-web";
//import styles from "../styleSheets/StyleSheet.js";
//import { HeaderComponent } from "../components/headerComponent.js";
import filter from "lodash.filter";
import typescript from "react-native-svg";
import { get, child, ref, set, push, getDatabase } from "firebase/database";
import SearchBarHeader from "../../components/SearchBar";

export default function HomeScreen() {
    let scrollOffsetY = useRef(new Animated.Value(0)).current;
    //const scrollOffsetY = new Animated.Value(0);
    // const scrollY = new Animated.Value(0);
    // const diffClamp = Animated.diffClamp(scrollY, 0, 40);
    // const translateYAxis = diffClamp.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, -1],
    // });

    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false); // State to track if the listings are loading
    const [listingsData, setListingsData] = useState([]); // State to store listings data
    const [error, setError] = useState(null); // State to track errors
    const [fullData, setFullData] = useState([]); // State to store the full listings data

    const [selectedListing, setSelectedListing] = useState(null); // State to store the selected listing
    const [refreshing, setRefreshing] = useState(false);
    
    const fetchListings = async () => {
        setRefreshing(true);
        try {
            const listingsData = await getAllListings();
            setFullData(listingsData);
            setListingsData(listingsData);
            console.log("Got all listings.");
            setRefreshing(false);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.error('Error:', error);
            setRefreshing(false);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // Fetch listings data from Firebase when the component mounts
        setIsLoading(true);
        fetchListings();
    }, []);

    const handleSearch = (query) => {
        setSearch(query);
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(fullData, (listing) => {
            return contains(listing, formattedQuery);
        });
        setListingsData(filteredData);
    }

    const contains = ({ title, description, condition }, query) => {
        title = title.toLowerCase();
        description = description.toLowerCase();

        if (title.includes(query) || description.includes(query) || condition.includes(query)) {
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
                <ActivityIndicator size="large" color="#5500dc" />
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F7F7" }}>
            <SearchBarHeader animHeaderValue={scrollOffsetY} handleSearch={handleSearch} />
            {/* Scrollable view displaying all the listings */}
            <FlatList
                data={Object.values(listingsData)}
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
                // keyExtractor={(item, index) => item.id + index.toString()}
                style={{
                    flex: 1,
                    backgroundColor: "#F9F7F7",
                    paddingTop: "5%",
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                    { useNativeDriver: false }
                )}
                bounces={true}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={getAllListings}
                    />
                }
            />
        </SafeAreaView>
    );
}
