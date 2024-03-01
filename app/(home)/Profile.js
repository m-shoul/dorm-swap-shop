import {
    Text,
    View,
    FlatList,
    //Image,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { getUserSavedListings, getAllUserDataForProfile } from "../../backend/api/user.js";
import ListingPopup from "../../components/ListingPopup.js";
import ProfileHeader from "../../components/ProfileHeader.js";
import styles from "../(aux)/StyleSheet";

//import { create } from 'zustand'


export default function ProfileScreen() {
    const [savedListings, setSavedListings] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchSavedListings = async () => {
        try {
            const savedListings = await getUserSavedListings();
            setSavedListings(savedListings);
            setIsLoading(false);
        } catch (error) {
            console.error("ERROR: Could not get saved listings: ", error);
            setIsLoading(false);
        }
    };

    const fetchUserData = async () => {
        try {
            const user = await getAllUserDataForProfile();
            setUser(user);
            setIsLoading(false);
        } catch (error) {
            console.error("ERROR: Could not get user data: ", error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchSavedListings();
        fetchUserData();
    }, []);

    const handleItemPress = (listing) => {
        setSelectedListing(listing);
    };

    const handleRefresh = () => {
        fetchSavedListings();
        fetchUserData();
    }

    // console.log(user);

    const noSavedListings = () => (
        <Text style={{ textAlign: 'center' }}>No saved listings</Text>
    );

    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: styles.colors.darkColor }}>
            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={savedListings || []}
                    keyExtractor={(item) => item.listingId}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                width: "50%",
                                height: 230,
                                paddingHorizontal: "1%",
                                marginBottom: "1%"
                            }}>
                            <ListingPopup
                                listing={item}
                            />
                        </View>
                    )}
                    numColumns={2}
                    contentContainerStyle={{
                        backgroundColor: styles.colors.lightColor,
                        flexGrow: 1,
                    }}
                    style={{
                        backgroundColor: styles.colors.darkColor,
                        //backgroundColor: styles.colors.lightColor,
                    }}

                    bounces={true}
                    refreshControl={
                        <RefreshControl
                            // style={{ backgroundColor: styles.colors.darkColor }}
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            tintColor={styles.colors.lightColor}
                        />
                    }
                    ListEmptyComponent={noSavedListings}
                    ListHeaderComponent={<ProfileHeader user={user} />}
                //scrollEventThrottle={10}
                />
            )}
        </View>
    );
}
