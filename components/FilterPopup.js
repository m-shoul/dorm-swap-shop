import { View, Text, Pressable, Modal, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import FilterComponent from "../assets/svg/filter_icon";
import ExpandComponent from "../assets/svg/expand_icon";
import styles from "../app/(aux)/StyleSheet";
import { Button } from "../components/Buttons";
import RNPickerSelect from "react-native-picker-select";
import { categories, conditions } from "./Enums";
import React, { useState, useRef } from "react";

export default function FilterPopup() {
    const [modalVisible, setModalVisible] = useState(false);
    const [category, setCategory] = useState(null);
    const [condition, setCondition] = useState(null);
    const [activePrice, setActivePrice] = useState(null);
    const conditionInputRef = useRef(null);
    const categoryInputRef = useRef(null);
    const defaultColor = "#B3B3B3";
    const activeColor = "#3F72AF";
    return (
        <SafeAreaView>
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
                        //alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                        width: "90%",
                        height: "50%",
                    }}>
                        <View>
                            <Text style={styles.postListingHeader}>Filter</Text>
                        </View>
                        <View style={{ marginTop: "6%" }}>
                            <Text style={[styles.normaltext, { marginBottom: "2%" }]}>Category</Text>
                            <View style={styles.dropdownlists}>
                                <RNPickerSelect
                                    returnKeyType="done"
                                    blurOnSubmit={false}
                                    onValueChange={(value) => {
                                        setCategory(value);
                                    }}
                                    // onDonePress={() => {
                                    //     conditionInputRef.current.togglePicker();
                                    // }}
                                    placeholder={{
                                        label: "Select a Category",
                                        value: null,
                                    }}
                                    // onSubmitEditing={() => {
                                    //     Keyboard.dismiss();
                                    // }}
                                    items={categories}
                                    ref={categoryInputRef}
                                    style={{
                                        inputIOS: {
                                            fontSize: normalText, // Change this to your desired font size
                                        },
                                        inputAndroid: {
                                            fontSize: normalText, // Change this to your desired font size
                                        },
                                        iconContainer: {
                                            right: "3%",
                                        }
                                    }}
                                    Icon={() => {
                                        return (
                                            <ExpandComponent />
                                        )
                                    }}
                                />
                            </View>
                        </View>

                        <Text style={[styles.normaltext, { marginBottom: "2%" }]}>Price</Text>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            height: "12%",
                            marginBottom: "6%"
                        }}>
                            <Button
                                width="30%"
                                backgroundColor={activePrice === "$" ? activeColor : defaultColor}
                                title="$"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius="25%"
                                press={() => setActivePrice('$')}
                                titleStyle={styles.buttonText}
                            />
                            <Button
                                width="30%"
                                backgroundColor={activePrice === "$$" ? activeColor : defaultColor}
                                title="$$"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius="25%"
                                press={() => setActivePrice('$$')}
                                titleStyle={styles.buttonText}
                            />
                            <Button
                                width="30%"
                                backgroundColor={activePrice === "$$$" ? activeColor : defaultColor}
                                title="$$$"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius="25%"
                                press={() => setActivePrice('$$$')}
                                titleStyle={styles.buttonText}
                            />
                        </View>


                        <Text style={[styles.normaltext, { marginBottom: "2%" }]}>Condition</Text>
                        <View style={styles.dropdownlists}>
                            <RNPickerSelect
                                returnKeyType="done"
                                blurOnSubmit={false}
                                placeholder={{
                                    label: "Select a Condition",
                                    value: null,
                                }}
                                onBlur={() => {
                                    Keyboard.dismiss();
                                }}
                                // onDonePress={() => {
                                //     Keyboard.dismiss();
                                //     setTimeout(() => {
                                //         descriptionInputRef.current.focus();
                                //     }, 100);
                                // }}
                                onValueChange={(value) => {
                                    //Keyboard.dismiss();
                                    setCondition(value);
                                }}
                                // onSubmitEditing={() => {
                                //     Keyboard.dismiss();
                                // }}
                                ref={conditionInputRef}
                                items={conditions}
                                style={{
                                    inputIOS: {
                                        fontSize: normalText, // Change this to your desired font size
                                    },
                                    inputAndroid: {
                                        fontSize: normalText, // Change this to your desired font size
                                    },
                                    iconContainer: {
                                        right: "3%",
                                    }
                                }}
                                Icon={() => {
                                    return (
                                        <ExpandComponent />
                                    )
                                }}
                            />
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", height: "12%" }}>
                            <Button
                                width="40%"
                                backgroundColor="#B3B3B3"
                                title="Cancel"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius="25%"
                                press={() => [setModalVisible(!modalVisible), setActivePrice(null), setCategory(null), setCondition(null)]}
                                titleStyle={styles.buttonText}
                            />
                            <Button
                                width="50%"
                                backgroundColor="#3F72AF"
                                title="Apply"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius="25%"
                                press={() => setModalVisible(!modalVisible)}
                                titleStyle={styles.buttonText}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}