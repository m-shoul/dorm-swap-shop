import { View, Text, Pressable, Modal, TouchableOpacity, Dimensions, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "../app/(aux)/StyleSheet";
import SquareHeader from "./SquareHeader.js";
import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';

export default function AdPopup() {
    const [modalVisible, setModalVisible] = useState(false);
    const [category, setCategory] = useState(null);
    const [condition, setCondition] = useState(null);
    const [activePrice, setActivePrice] = useState(null);
    const conditionInputRef = useRef(null);
    const categoryInputRef = useRef(null);
    const defaultColor = "#B3B3B3";
    const activeColor = styles.colors.darkAccentColor;
    const insets = useSafeAreaInsets();
    return (
        <View style={{ justifyContent: "center" }}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={{ textAlign: "center" }}>Click here to rent out Ad space</Text>
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
                            //paddingTop: "-8%",
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
                                        image: listing.images,
                                        title: listing.title,
                                    },
                                });
                            }}>
                            <Ionicons name="alert-circle-outline" size={32} color="white" />
                        </TouchableOpacity>
                    </View>
                    {/* IMAGE */}
                    <View style={{ height: 380, justifyContent: "center" }}>
                        <Text>Ad Image</Text>
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
                                Ad Company
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
                                To rent out Ad space contact: dormswapnshop@gmail.com
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}