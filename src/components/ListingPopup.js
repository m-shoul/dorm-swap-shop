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

const TestScreem = ({ navigation }) => {
    const { width, height } = Dimensions.get("window");
    const [modalVisible, setModalVisible] = useState(false);
    const simpleAlert = () => {
        Alert.alert("Favorited");
    };
    const images = [
        require("../assets/testImages/swoledoge.jpg"),
        require("../assets/testImages/thumb.jpg"),
        require("../assets/testImages/batt.jpg"),
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>Chat</Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text>Show Modal</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible}>
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
                            onPress={() => setModalVisible(false)}>
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
                                setModalVisible(false);
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
                            <Text style={[styles.boldtext, { flex: 1 }]}>
                                The dog is very swole
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
                            <Text style={[styles.boldtext, { flex: 1 }]}>
                                $1,000,000
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                margin: "3%",
                            }}>
                            <Text style={[styles.normaltext, { flex: 1 }]}>
                                Condition: Brand new
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: "3%",
                            }}>
                            <Text style={[styles.normalText, { flex: 1 }]}>
                                I own a musket for home defense, since that's
                                what the founding fathers intended. Four
                                ruffians break into my house. "What the devil?"
                                As I grab my powdered wig and Kentucky rifle.
                                Blow a golf b
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
                                setModalVisible(false);
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

export default TestScreem;
