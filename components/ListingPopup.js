import React, { useEffect, useState } from "react";
import {
    ScrollView,
    Modal,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    //Image,
    Dimensions,
    Alert,
} from "react-native";
import { Image } from "expo-image";
import styles from "../app/(aux)/StyleSheet.js";
import Swiper from "react-native-swiper";
import Xmark from "../assets/svg/xmark.js";
import ReportComponent from "../assets/svg/report_icon.js";
import FavouriteIcon from "../assets/svg/favourite_icon.js";
import SavedListingIcon from "../assets/svg/savedListing_icon.js";
import { useRouter, useLocalSearchParams } from "expo-router";
import { saveListing, unsaveListing } from "../backend/api/listing.js";
import { Button } from "./Buttons.js";
import { getUsernameByID } from "../backend/api/user.js";
import { isListingFavorited } from "../backend/api/listing.js";

export default function ListingPopup({ listing }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const { width, height } = Dimensions.get("window");
    const [listingModalVisible, setListingModalVisible] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [username, setUsername] = useState("");

    const router = useRouter();

    const simpleAlert = () => {
        setIsFavorited(!isFavorited);

        if (isFavorited) {
            unsaveListing(listing.listingId);
            Alert.alert("Unsaved");
        } else {
            saveListing(listing.listingId);
            Alert.alert("Favorited");
        }
    };

    const openModal = () => {
        setListingModalVisible(true);
    };

    const closeModal = () => {
        setListingModalVisible(false);
        router.push("(chat)/ConversationsScreen");
    };

    const listingTitle =
        listing.price && listing.title
            ? listing.price.length + listing.title.length > 22
                ? listing.title.substring(0, 14) + "..."
                : listing.title
            : "";

    const fetchUser = async () => {
        const username = await getUsernameByID(listing.user);
        setUsername(username);
    };

    const checkIfFavorited = async () => {
        const favorited = await isListingFavorited(listing.listingId);
        setIsFavorited(favorited);
    };

    useEffect(() => {
        fetchUser();
        checkIfFavorited();
        console.log("*** IN APP - ListingPopup.js*** " + listing.description);
    }, []);

    const timestamp = new Date(listing.timestamp).toLocaleDateString("en-US");
    const [nestedModalImage, setNestedModalImage] = useState(false);
    // console.log("Listing images " + listing.title + " " + listing.images);

    return (
        <SafeAreaView>
            {/* This touchable opacity needs to be moved out of here. All we want this popup to do is
        show a swipeable image carousel and some text. We don't want it to show the listing as
        it is supposed to look on the home screen. This should be able to be used anywhere. */}
            <TouchableOpacity onPress={openModal}>
                <View style={{ backgroundColor: "white" }}>
                    <TouchableOpacity
                        style={{
                            flex: 0,
                            position: "absolute",
                            right: "1%",
                            top: "1%",
                            zIndex: 1,
                        }}
                        onPress={simpleAlert}>
                        {!isFavorited ? (
                            <FavouriteIcon />
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
                    {Array.isArray(listing.images) ? (
                        <Image
                            source={{ uri: listing.images[0] }}
                            style={{ width: "100%", height: 200 }}
                        />
                    ) : (
                        <Image
                            source={{ uri: listing.images }}
                            style={{ width: "100%", height: 200 }}
                        />
                    )}
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
                                    params: { image: listing.images },
                                });
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
                        {Array.isArray(listing.images) ? (
                            <TouchableOpacity
                                delayPressIn={100}
                                onPress={() => setNestedModalImage(true)}>
                                <Swiper
                                    loop={false}
                                    onIndexChanged={(index) =>
                                        setCurrentIndex(index)
                                    }>
                                    {listing.images.map(
                                        (imageUrl, currentIndex) => (
                                            <TouchableOpacity
                                                key={currentIndex}
                                                delayPressIn={100}
                                                onPress={() => {
                                                    setNestedModalImage(true);
                                                    setSelectedImage(imageUrl);
                                                }}>
                                                <Image
                                                    source={{ uri: imageUrl }}
                                                    style={{
                                                        width: width,
                                                        height: 250,
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        )
                                    )}
                                </Swiper>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() =>
                                    setNestedModalImage(true)
                                }></TouchableOpacity>
                        )}
                    </View>
                    {/* This allows an image to be clicked on, and then zoomed*/}
                    <Modal
                        style={{ backgroundColor: "black" }}
                        animationType="slide"
                        transparent={true}
                        visible={nestedModalImage}
                        onRequestClose={() => setNestedModalImage(false)}>
                        <TouchableOpacity
                            style={{ flex: 1, backgroundColor: "black" }}
                            onPress={() => setNestedModalImage(false)}
                            activeOpacity={1}>
                            <ScrollView
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                maximumZoomScale={3}
                                minimumZoomScale={1}
                                centerContent={true}>
                                <Image
                                    source={{ uri: selectedImage }}
                                    style={{
                                        width: "90%",
                                        height: "90%",
                                        resizeMode: "contain",
                                        marginBottom: "",
                                    }}
                                />
                            </ScrollView>
                        </TouchableOpacity>
                    </Modal>
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
                            </Text>
                            <TouchableOpacity
                                style={{ flex: 0 }}
                                onPress={simpleAlert}>
                                {!isFavorited ? (
                                    <FavouriteIcon />
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
                            {/* USER */}
                            <Text style={[styles.normaltext, { flex: 1 }]}>
                                {username}
                            </Text>
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
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                margin: "3%",
                            }}>
                            {/* TIME POSTED */}
                            <Text style={[styles.normaltext, { flex: 1 }]}>
                                {timestamp}
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
                        <Button
                            backgroundColor="#3F72AF"
                            title="Reply"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="25%"
                            width="80%"
                            height="20%"
                            marginTop="12%"
                            press={closeModal}
                            titleStyle={styles.buttonText}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}
