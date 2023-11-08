import { Text, View, TouchableOpacity, FlatList, SafeAreaView, Image, Animated, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styleSheets/StyleSheet.js";
//import { getAuth, signOut } from "firebase/auth";
import ListingPopup from "../components/ListingPopup.js";
import { SearchBar } from "@rneui/themed";
import { get, child, ref, set, push, getDatabase } from 'firebase/database';
import { ScrollView } from "react-native-web";

//import styles from "../styleSheets/StyleSheet.js";
//import { HeaderComponent } from "../components/headerComponent.js";


const HomeScreen = ({ navigation }) => {

    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, 40);
    const translateYAxis = diffClamp.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -1],
    });

    // Delete this once the listings are 100% working.
    // This was used for testing.
    // const persons = [{
    //     id: "1",
    //     name: "Earnest Green",
    // },
    // {
    //     id: "2",
    //     name: "Winston Orn",
    // },
    // {
    //     id: "3",
    //     name: "Carlton Collins",
    // },
    // {
    //     id: "4",
    //     name: "Malcolm Labadie",
    // },
    // {
    //     id: "5",
    //     name: "Michelle Dare",
    // },
    // {
    //     id: "6",
    //     name: "Carlton Zieme",
    // },
    // {
    //     id: "7",
    //     name: "Jessie Dickinson",
    // },
    // {
    //     id: "8",
    //     name: "Julian Gulgowski",
    // },
    // {
    //     id: "9",
    //     name: "Ellen Veum",
    // },
    // {
    //     id: "10",
    //     name: "Lorena Rice",
    // },

    // {
    //     id: "11",
    //     name: "Carlton Zieme",
    // },
    // {
    //     id: "12",
    //     name: "Jessie Dickinson",
    // },
    // {
    //     id: "13",
    //     name: "Julian Gulgowski",
    // },
    // {
    //     id: "14",
    //     name: "Ellen Veum",
    // },
    // {
    //     id: "15",
    //     name: "Lorena Rice",
    // },];

    const [search, setSearch] = useState("");
    const [listingsData, setListingsData] = useState([]); // State to store listings data
    const [selectedListing, setSelectedListing] = useState(null); // State to store the selected listing

    const [refreshing, setRefreshing] = React.useState(false);


    const db = getDatabase();
    const listingsReference = ref(db, 'dorm_swap_shop/listings/');

    const fetchListings = () => {
        setRefreshing(true);
        get(listingsReference)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const listingsData = snapshot.val();
                    // Set the retrieved data to the state
                    setListingsData(listingsData);
                    setRefreshing(false);
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching listings:", error);
            });
    };

    useEffect(() => {
        // Fetch listings data from Firebase when the component mounts
        fetchListings();
    }, []);

    const handleItemPress = (listing) => {
        setSelectedListing(listing);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F7F7" }}>

            {/* {HeaderComponent(translateYAxis)} */}
            <Animated.View style={{
                transform: [{ translateY: translateYAxis }],
                //elevation: 4,
                zIndex: 100,
            }}>
                <SearchBar
                    round
                    searchIcon={{ size: 24, color: "black" }}
                    containerStyle={styles.searchContainer}
                    inputStyle={{ backgroundColor: "#fff" }}
                    inputContainerStyle={{
                        backgroundColor: "#fff", borderRadius: 40,
                        borderWidth: 1, borderBottomWidth: 1, borderColor: "#B3B3B3"
                    }}
                    onChangeText={setSearch}
                    //onClear={(text) => searchFilterFunction("")}
                    placeholder="Search"
                    value={search}
                />
            </Animated.View>
            {/* </View> */}

            {/* Refresh button */}
            {/* <TouchableOpacity onPress={fetchListings} style={{ marginTop: "10%" }}>
                <Text>Refresh</Text>
            </TouchableOpacity> */}

            {/* Scrollable view displaying all the listings */}

            <FlatList
                data={Object.values(listingsData)}
                renderItem={({ item }) => (
                    <View style={{ width: "50%", height: 300, padding: "1%" }}>
                        {/* <TouchableOpacity style={{ width: "50%", height: 200, padding: "1%" }}
                            onPress={() => handleItemPress(listing = { item })}
                            key={item.id}
                        > */}
                        {/* <View style={{ backgroundColor: "white", flex: 1 }}> */}
                        {/* Source might be something like source={{uri: item.images}} */}
                        {/* <Image source={require("../assets/expo/splash_screen_dark.png")} style={{ width: "100%", height: "80%" }} />
                                <View style={{ backgroundColor: "#B3B3B3", height: 1, width: "100%", marginBottom: "5%" }} />
                                <Text>{"$" + item.price + " - " + item.title}</Text>
                            </View> */}
                        {/* </TouchableOpacity> */}
                        <ListingPopup
                            listing={item}
                            navigation={navigation}
                        />

                    </View>

                )}
                numColumns={2}
                keyExtractor={(item) => item.id}
                style={{ flex: 1, backgroundColor: "#F9F7F7", paddingTop: "5%" }}
                onScroll={(e) => {
                    scrollY.setValue(e.nativeEvent.contentOffset.y);
                }}
                bounces={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchListings} />
                }
            />
        </SafeAreaView>
    );
}

export default HomeScreen;