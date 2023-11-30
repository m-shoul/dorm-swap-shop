import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Image,
    Animated,
    RefreshControl,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { getAllListings } from "../../backend/api/listing";
import styles from "../(aux)/StyleSheet";
//import { getAuth, signOut } from "firebase/auth";
import ListingPopup from "../../components/ListingPopup";
// import { get, child, ref, set, push, getDatabase } from "firebase/database";
import { ScrollView } from "react-native-web";
//import styles from "../styleSheets/StyleSheet.js";
//import { HeaderComponent } from "../components/headerComponent.js";

import { get, child, ref, set, push, getDatabase } from "firebase/database";
import SearchBarHeader from "../../components/SearchBar";

export default function HomeScreen() {
    const scrollOffsetY = useRef(new Animated.Value(0)).current;
    //const scrollOffsetY = new Animated.Value(0);
    // const scrollY = new Animated.Value(0);
    // const diffClamp = Animated.diffClamp(scrollY, 0, 40);
    // const translateYAxis = diffClamp.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, -1],
    // });

    const [listingsData, setListingsData] = useState([]); // State to store listings data
    const [selectedListing, setSelectedListing] = useState(null); // State to store the selected listing
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        // Fetch listings data from Firebase when the component mounts
        const fetchListings = async () => {
            setRefreshing(true);
            try {
                const listingsData = await getAllListings();
                setListingsData(listingsData);
                console.log("Got all listings.");
                setRefreshing(false);
            } catch (error) {
                console.error('Error:', error);
                setRefreshing(false);
            }
        }
        fetchListings();
    }, []);

    const handleItemPress = (listing) => {
        setSelectedListing(listing);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F7F7" }}>

            <SearchBarHeader animHeaderValue={scrollOffsetY} />
            {/* Scrollable view displaying all the listings */}
            <FlatList
                data={Object.values(listingsData)}
                renderItem={({ item }) => (
                    <View style={{ width: "50%", height: 230, padding: "1%" }}>
                        <ListingPopup
                            listing={item}
                        //navigation={router}
                        />
                    </View>
                )}
                numColumns={2}
                keyExtractor={(item, index) => item.id + index.toString()}
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
                        onRefresh={getAllListings}
                    />
                }
                scrollEventThrottle={10}
            />
        </SafeAreaView>
    );
}
