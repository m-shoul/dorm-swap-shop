import { View, Text, Modal, TouchableOpacity, Dimensions, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "../app/(aux)/StyleSheet";
import SquareHeader from "./SquareHeader.js";
import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';


export default function AdPopup({ Ad }) {
    const { width, height } = Dimensions.get("window");
    const [modalVisible, setModalVisible] = useState(false);
    const insets = useSafeAreaInsets();

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={{ backgroundColor: "white", borderRadius: 20 }}>
                    {Ad.image ? <Image
                        source={Ad.image}
                        style={{
                            width: "100%",
                            height: 200,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}
                    /> : <View style={{
                        width: "100%",
                        height: 200,
                        justifyContent: "center",
                    }}><Text style={{ textAlign: "center" }}>Click here to rent out Ad space</Text></View>}

                    <View
                        style={{
                            backgroundColor: "#B3B3B3",
                            height: 1,
                            width: "100%",
                            marginTop: "2%",
                            marginBottom: "2%",
                        }}
                    />
                    <Text style={{ paddingLeft: 10, fontSize: 13 }}>
                        {Ad.title}
                    </Text>
                </View>
            </TouchableOpacity>
            <Modal visible={modalVisible}>
                <View style={[styles.background, { paddingTop: insets.top }]}>
                    <SquareHeader height={55} />
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: "1%",
                            justifyContent: "space-between",
                            paddingHorizontal: 20,
                            backgroundColor: styles.colors.darkColor,
                        }}>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => setModalVisible(false)}>
                            <Ionicons name="close" size={32} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ flex: 0 }}
                            onPress={() => {
                                setModalVisible(false);
                                router.push({
                                    pathname: "ReportScreen",
                                    params: {
                                        image: Ad.images,
                                        title: Ad.title,
                                    },
                                });
                            }}>
                            <Ionicons name="alert-circle-outline" size={32} color="white" />
                        </TouchableOpacity>
                    </View>
                    {/* IMAGE */}
                    <View style={{ height: 380, justifyContent: "center" }}>

                        {Ad.image ? <Image source={Ad.image} style={{ width: width, height: 375 }} /> : <Text>Ad Image</Text>}
                        {/* <Text>Ad Image</Text> */}
                    </View>
                    <View style={{ width: "100%" }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                margin: "3%",
                                marginBottom: "0%",
                            }}>
                            {/* TITLE */}
                            <Text style={[styles.boldtext, { flex: 1 }]}>
                                {Ad.title}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: "3%",
                            }}>
                            {/* DESCRIPTION */}
                            <Text style={{ flex: 1 }}>
                                {Ad.description}
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}