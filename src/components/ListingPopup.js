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
import styles from "../styleSheets/StyleSheet.js";

import NavComponent from "./Component.js";
import Swiper from "react-native-swiper";
import Xmark from "../assets/svg/xmark.js";
import ReportComponent from "../assets/svg/report_icon.js";
import FavouriteIcon from "../assets/svg/favourite_icon.js";

const ListingPopup = ({ navigation, listing }) => {
    const { width, height } = Dimensions.get("window");
    const [listingModalVisible, setListingModalVisible] = useState(false);
    const simpleAlert = () => {
        Alert.alert("Favorited");
    };
    const images = [
        require("../assets/testImages/swoledoge.jpg"),
        require("../assets/testImages/thumb.jpg"),
        require("../assets/testImages/batt.jpg"),
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const openModal = () => {
        setListingModalVisible(true);
    };

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={openModal}>
                <Text style={{backgroundColor: "red"}}>Show Modal</Text>
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
                                navigation.navigate("ReportScreen");
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
                    <View style={{ height: "33%" }}>
                        <Swiper
                            loop={false}
                            onIndexChanged={(index) => setCurrentIndex(index)}>
                            {images.map((image, currentIndex) => (
                                <Image
                                    key={currentIndex}
                                    source={image}
                                    style={{ width: width, height: 250 }}
                                />
                            ))}
                        </Swiper>
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
                                <FavouriteIcon
                                    style={{
                                        width: 15,
                                        height: 15,
                                        stroke: "black",
                                        strokeWidth: 0.25,
                                    }}
                                />
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
                        <TouchableOpacity
                            onPress={() => {
                                setListingModalVisible(false);
                                navigation.navigate("ChatScreen");
                            }}
                            style={[
                                styles.loginBtn,
                                {
                                    height: "25%",
                                },
                            ]}>
                            <Text style={styles.buttonText}>Reply</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: "10%" }}>
                        <NavComponent navigation={navigation} />
                    </View>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
};

export default ListingPopup;
