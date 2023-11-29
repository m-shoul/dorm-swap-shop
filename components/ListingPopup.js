import React, { useState } from "react";
import {
    Modal,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Dimensions,
    Alert,
} from "react-native";
import styles from "../app/(aux)/StyleSheet.js";

import Swiper from "react-native-swiper";
import Xmark from "../assets/svg/xmark.js";
import ReportComponent from "../assets/svg/report_icon.js";
import FavouriteIcon from "../assets/svg/favourite_icon.js";
import SavedListingIcon from "../assets/svg/savedListing_icon.js";
import { useRouter, useLocalSearchParams } from "expo-router";
import { saveListing, unsaveListing } from "../backend/api/listing.js";
import { Button } from './Buttons.js';

export default function ListingPopup({ listing }) {
    const { width, height } = Dimensions.get("window");
    const [listingModalVisible, setListingModalVisible] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    const router = useRouter();

    const simpleAlert = () => {
        setIsFavorited(!isFavorited);

        // Currently the listing can be saved and unsaved and it is added to the
        // database under the UID, which is the Firebase auth UID... we want this to
        // be stored under the realtime push UID... but these are different things
        // so we have to come up with a solution to store the UID in the user data
        // and then save the data in that direction??
        if (isFavorited) {
            unsaveListing(listing.listingId);
            Alert.alert("Unsaved");
        } else {
            saveListing(listing.listingId);
            Alert.alert("Favorited");
        }
    };
    //Use this for when the user is able to post more than one image
    // const images = [
    // ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const openModal = () => {
        setListingModalVisible(true);
    };

    const closeModal = () => {
        setListingModalVisible(false);
        router.push("Chat");
    };

    const listingTitle =
        listing.price.length + listing.title.length > 22
            ? listing.title.substring(0, 14) + "..."
            : listing.title;

    // console.log("Listing images " + listing.title + " " + listing.images);

    return (
        <SafeAreaView>
            {/* This touchable opacity needs to be moved out of here. All we want this popup to do is
        show a swipeable image carousel and some text. We don't want it to show the listing as
        it is supposed to look on the home screen. This should be able to be used anywhere. */}
            <TouchableOpacity onPress={openModal}>
                <View style={{ backgroundColor: "white" }}>
                    {/* Source might be something like source={{uri: item.images}} */}
                    <Image
                        source={{ uri: listing.images }}
                        style={{ width: "100%", height: 200 }}
                    />
                    <View
                        style={{
                            backgroundColor: "#B3B3B3",
                            height: 1,
                            width: "100%",
                            marginBottom: "2%",
                        }}
                    />
                    <Text>{"$" + listing.price + " - " + listingTitle}</Text>
                </View>
                {/* <Text style={{ backgroundColor: "red" }}>Show Listing</Text> */}
            </TouchableOpacity>

            <Modal visible={listingModalVisible}>
                <SafeAreaView style={styles.background}>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: "10%",
                            justifyContent: "space-between",
                            paddingHorizontal: 20,
                            height: "3%",
                        }}>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => setListingModalVisible(false)}>
                            <Xmark
                                source={require("../assets/svg/xmark.js")}
                                style={{
                                    width: 200,
                                    height: 28,
                                    stroke: "black",
                                    strokeWidth: 0.25,
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ flex: 0 }}
                            onPress={() => {
                                setListingModalVisible(false);
                                router.push({
                                    pathname: "ReportScreen",
                                    params: listing,
                                });

                                // Pass the image into the report screen and display
                                // it at the top so the user knows what listing they are
                                // reporting.
                            }}>
                            <ReportComponent
                                style={{
                                    width: 15,
                                    height: 15,
                                    stroke: "black",
                                    strokeWidth: 0.25,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* IMAGE */}
                    <View style={{ height: "33%" }}>
                        <Image
                            source={{ uri: listing.images }}
                            style={{ width: width, height: 250 }}
                        />
                        {/* <Swiper
                            loop={false}
                            onIndexChanged={(index) => setCurrentIndex(index)}>
                            {images.map((image, currentIndex) => (
                                <Image
                                    key={currentIndex}
                                    source={listing.images}
                                    style={{ width: width, height: 250 }}
                                />
                            ))}
                        </Swiper> */}
                    </View>
                    <View style={{ width: "100%", height: "25%" }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                margin: "3%",
                                marginBottom: "0%",
                            }}>
                            {/* TITLE */}
                            <Text style={[styles.boldtext, { flex: 1 }]}>
                                {listing.title}
                                {/* The dog is very swole */}
                            </Text>
                            <TouchableOpacity
                                style={{ flex: 0 }}
                                onPress={simpleAlert}>
                                {!isFavorited ? (
                                    <FavouriteIcon
                                        style={{
                                            width: 15,
                                            height: 15,
                                            fill: "black",
                                        }}
                                    />
                                ) : (
                                    <SavedListingIcon
                                        style={{
                                            width: 15,
                                            height: 15,
                                            fill: "yellow",
                                        }}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: "3%",
                                marginTop: "2%",
                            }}>
                            {/* PRICE */}
                            <Text style={[styles.boldtext, { flex: 1 }]}>
                                {"$" + listing.price}
                                {/* $1,000,000 */}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                margin: "3%",
                            }}>
                            {/* CONDITION */}
                            <Text style={[styles.normaltext, { flex: 1 }]}>
                                {listing.condition}
                                {/* Condition: Brand new */}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: "3%",
                            }}>
                            {/* DESCRIPTION */}
                            <Text style={[styles.normalText, { flex: 1 }]}>
                                {listing.description}
                                {/* I own a musket for home defense, since that's
                                what the founding fathers intended. Four
                                ruffians break into my house. "What the devil?"
                                As I grab my powdered wig and Kentucky rifle.
                                Blow a golf b */}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                            width: "80%",
                            height: "25%",
                        }}>
                        {/* <TouchableOpacity
                            onPress={() => {
                                setListingModalVisible(false);
                                router.push("Chat");
                            }}
                            style={[
                                styles.loginBtn,
                                {
                                    height: "20%",
                                },
                            ]}>
                            <Text style={styles.buttonText}>Reply</Text>
                        </TouchableOpacity> */}
                        <Button backgroundColor="#3F72AF" title="Post" alignItems="center"
                            justifyContent="center" borderRadius="25%" width="80%"
                            height="20%" marginTop="12%" press={closeModal} titleStyle={styles.buttonText}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}
