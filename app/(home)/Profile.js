import {
    Text,
    View,
    FlatList,
    //Image,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { getUserSavedListings, getAllUserDataForProfile } from "../../backend/api/user.js";
import ListingPopup from "../../components/ListingPopup.js";
import ProfileHeader from "../../components/ProfileHeader.js";

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

    console.log(user);

    const noSavedListings = () => (
        <Text style={{ textAlign: 'center' }}>No saved listings</Text>
    );

    // Profile image stuff
    // const [profileImage, setProfileImage] = useState(null);
    // const pickProfileImage = async () => {
    //     console.log("Picking profile image.");
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         selectionLimit: 1,
    //         aspect: [1, 1],
    //         quality: 0.1
    //     });

    //     if (result.assets && result.assets.length > 0) {
    //         const selectedProfileImage = result.assets[0];
    //         setProfileImage(selectedProfileImage.uri);
    //         uploadProfileImage(selectedProfileImage.uri);
    //     }
    // };

    // const profileImageUrl = user?.public?.profileImage;
    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, backgroundColor: '#112D4E', paddingTop: insets.top }}>

            {isLoading ? (
                <ActivityIndicator size="large" color="#112d4e" />
            ) : (
                <FlatList
                    data={savedListings || []}
                    keyExtractor={(item) => item.listingId}
                    renderItem={({ item }) => (
                        <View style={{ width: "50%", padding: "1%" }}>
                            <ListingPopup listing={item} />
                        </View>
                    )}
                    numColumns={2}
                    contentContainerStyle={{
                        backgroundColor: "#F9F7F7",
                    }}
                    onScroll={(e) => {
                        // scrollY.setValue(e.nativeEvent.contentOffset.y);
                    }}
                    bounces={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            tintColor={"#F9F7F7"}
                        />
                    }
                    ListEmptyComponent={noSavedListings}
                    ListHeaderComponent={<ProfileHeader user={user} />}
                />
            )}
        </View>
    );
}
