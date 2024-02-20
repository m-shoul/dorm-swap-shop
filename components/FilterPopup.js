import { View, Text, Pressable, Modal, TouchableOpacity, Dimensions, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FilterComponent from "../assets/svg/filter_icon";
import ExpandComponent from "../assets/svg/expand_icon";
import styles from "../app/(aux)/StyleSheet";
import { Button } from "../components/Buttons";
import RNPickerSelect from "react-native-picker-select";
import { categories, conditions } from "./Enums";
import React, { useState, useRef, useEffect } from "react";
import { normalizeText } from "@rneui/base";

export default function FilterPopup({ handleFiltering }) {
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
                <FilterComponent />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Filters have been applied.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        backgroundColor: '#F9F7F7',
                        borderRadius: 20,
                        padding: 20,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                        width: "90%",
                        height: 450,
                    }}>
                        <View>
                            <Text style={styles.postListingHeader}>Filter</Text>
                        </View>
                        <View style={{ marginTop: 12 }}>
                            <Text style={[styles.normaltext, { marginBottom: "2%" }]}>Category</Text>
                            <View style={styles.dropdownlists}>
                                <RNPickerSelect
                                    value={category}
                                    returnKeyType="done"
                                    blurOnSubmit={false}
                                    onValueChange={(value) => {
                                        setCategory(value);
                                    }}
                                    placeholder={{
                                        label:"Select a Category",
                                        value: null,
                                    }}
                                    items={categories}
                                    ref={categoryInputRef}
                                    style={{
                                        inputIOS: {
                                            paddingTop: "2%",
                                            paddingLeft: "5%",
                                            fontSize: normalText,
                                        },
                                        inputAndroid: {
                                            marginTop: -8,
                                            fontSize: normalText,
                                        },
                                        iconContainer: {
                                            top: 5,
                                            right: "3%",
                                        }
                                    }}
                                    Icon={() => {
                                        if (Platform.OS === "ios") {
                                            return (
                                                <ExpandComponent />
                                            )
                                        }
                                    }}
                                />
                            </View>
                        </View>

                        <Text style={[styles.normaltext, { marginBottom: "2%" }]}>Price</Text>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            marginBottom: "6%"
                        }}>
                            <Button
                                width="30%"
                                backgroundColor={activePrice === "$" ? activeColor : defaultColor}
                                title="$"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius={25}
                                press={() => setActivePrice('$')}
                                titleStyle={styles.buttonText}
                            />
                            <Button
                                width="30%"
                                backgroundColor={activePrice === "$$" ? activeColor : defaultColor}
                                title="$$"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius={25}
                                press={() => setActivePrice('$$')}
                                titleStyle={styles.buttonText}
                            />
                            <Button
                                width="30%"
                                backgroundColor={activePrice === "$$$" ? activeColor : defaultColor}
                                title="$$$"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius={25}
                                press={() => setActivePrice('$$$')}
                                titleStyle={styles.buttonText}
                            />
                        </View>


                        <Text style={[styles.normaltext, { marginBottom: "2%" }]}>Condition</Text>
                        <View style={styles.dropdownlists}>
                            <RNPickerSelect
                                value={condition}
                                returnKeyType="done"
                                blurOnSubmit={false}
                                placeholder={{
                                    label: "Select a Condition",
                                    value: null,
                                }}
                                onBlur={() => {
                                    Keyboard.dismiss();
                                }}
                                onValueChange={(value) => {
                                    setCondition(value);
                                }}
                                ref={conditionInputRef}
                                items={conditions}
                                style={{
                                    inputIOS: {
                                        paddingTop: "2%",
                                        paddingLeft: "4%",
                                        fontSize: normalText,
                                    },
                                    inputAndroid: {
                                        marginTop: -8,
                                        fontSize: normalText,
                                    },
                                    iconContainer: {
                                        top: 5,
                                        right: "4%",
                                    }
                                }}
                                Icon={() => {
                                    if (Platform.OS === "ios") {
                                        return (
                                            <ExpandComponent />
                                        )
                                    }
                                }}
                            />
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Button
                                width="40%"
                                backgroundColor="#B3B3B3"
                                title="Cancel"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius={25}
                                press={() => [setModalVisible(!modalVisible), setActivePrice(null), setCategory(null), setCondition(null)]}
                                titleStyle={styles.buttonText}
                            />
                            <Button
                                width="50%"
                                backgroundColor={styles.colors.darkAccentColor}
                                title="Apply"
                                alignItems="center"
                                justifyContent="center"
                                press={() => {
                                    setModalVisible(!modalVisible)
                                    handleFiltering(category, condition, activePrice);
                                }}
                                borderRadius={25}
                                titleStyle={styles.buttonText}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}