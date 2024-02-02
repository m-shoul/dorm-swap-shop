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
import ListImagesComponent from "../assets/svg/list_images.js";
import SquareHeader from "./SquareHeader.js";
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
import CachedImage from "expo-cached-image";

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
                ? listing.title.substring(0, 13) + "..."
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
    const [user, setUser] = useState(null);
    const profileImageUrl = user?.public?.profileImage;

    useEffect(() => {
        fetchUser();
        checkIfFavorited();
        console.log("*** IN APP - ListingPopup.js*** " + listing.description);
    }, []);

    const timestamp = new Date(listing.timestamp).toLocaleDateString("en-US");
    const [nestedModalImage, setNestedModalImage] = useState(false);

    var shortHash = require("short-hash");

    return (
        <SafeAreaView>
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
                        <CachedImage
                            source={{ uri: listing.images }}
                            cacheKey={`listing-${listing.id}-image`}
                            // cacheKey={shortHash(listing.id)} // listing.listingId
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
                    <SquareHeader height={"15%"} />
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: "1%",
                            justifyContent: "space-between",
                            paddingHorizontal: 20,
                            height: "5%",
                            backgroundColor: "#112D4E",
                            paddingTop: "-8%",
                        }}>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => setListingModalVisible(false)}>
                            <Xmark
                                source={require("../assets/svg/xmark.js")}
                                style={{
                                    width: 200,
                                    height: 28,
                                    stroke: "white",
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
                                    stroke: "white",
                                    strokeWidth: 0.25,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* IMAGE */}
                    <View style={{ height: "50%" }}>
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
                                                        height: 375,
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
                                Condition: {listing.condition}
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
                        <View
                            style={{
                                position: "absolute",
                                paddingLeft: "3%",
                                paddingTop: "3%",
                                marginTop: "50%",
                                flexDirection: "row",
                                alignItems: "center",
                                paddingRight: "3%",
                            }}>
                            <View style={{ marginRight: 10 }}>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 200,
                                        overflow: "hidden",
                                        borderWidth: 1,
                                        borderColor: "#B3B3B3",
                                    }}>
                                    {profileImageUrl ? (
                                        <CachedImage
                                            source={{
                                                uri: profileImageUrl,
                                            }}
                                            cacheKey={`user-${user.id}-profileImage`}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        />
                                    ) : (
                                        <ListImagesComponent
                                            source={require("../assets/svg/list_images.js")}
                                            style={{
                                                width: "20%",
                                                height: "20%",
                                                stroke: "black",
                                                strokeWidth: 0.25,
                                            }}
                                        />
                                    )}
                                </View>
                            </View>
                            <Text style={styles.boldtext}>{username}</Text>
                            <Text
                                style={[
                                    styles.normaltext,
                                    { marginLeft: "40%" },
                                ]}>
                                {timestamp}
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
                            height: "20%",
                        }}>
                        <Button
                            backgroundColor="#3F72AF"
                            title="Reply"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="25%"
                            width="80%"
                            height="35%"
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
