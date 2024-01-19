import { View, Text, Pressable, Modal, SafeAreaView, TouchableOpacity } from "react-native";
import FilterComponent from "../assets/svg/filter_icon";
import styles from "../app/(aux)/StyleSheet";
import { Button } from "../components/Buttons";
import RNPickerSelect from "react-native-picker-select";
import { categories } from "./Enums";
import React, { useState, useRef } from "react";

export default function FilterPopup() {
    const [modalVisible, setModalVisible] = useState(false);
    const [category, setCategory] = useState(null);
    const categoryInputRef = useRef(null);
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
                    //marginTop: 22,
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: 'red',
                        borderRadius: 20,
                        padding: 35,
                        alignItems: 'center',
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
                        <Text>Filter</Text>
                        <Text>Category</Text>
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
                            }}
                        />
                        <Text>Price</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Button
                                width="20%"
                                //height="15%"
                                backgroundColor="#B3B3B3"
                                title="$"
                                alignItems="center"
                                justifyContent="center"
                                marginTop="6%"
                                borderRadius="25%"
                                //marginRight="10%"
                                //press={() => setModalVisible(!modalVisible)}
                                titleStyle={styles.buttonText}
                            />
                            <Button
                                width="20%"
                                //height="15%"
                                backgroundColor="#3F72AF"
                                title="$$"
                                alignItems="center"
                                justifyContent="center"
                                marginTop="6%"
                                borderRadius="25%"
                                //press={() => setModalVisible(!modalVisible)}
                                titleStyle={styles.buttonText}
                            />
                            <Button
                                width="20%"
                                //sheight="15%"
                                backgroundColor="#3F72AF"
                                title="$$$"
                                alignItems="center"
                                justifyContent="center"
                                marginTop="6%"
                                borderRadius="25%"
                                //press={() => setModalVisible(!modalVisible)}
                                titleStyle={styles.buttonText}
                            />
                        </View>
                        <Text>Condition</Text>

                        <View style={{ flexDirection: "row", flex: 1 }}>
                            <Button
                                width="50%"
                                height="15%"
                                backgroundColor="#B3B3B3"
                                title="Cancel"
                                alignItems="center"
                                justifyContent="center"
                                marginTop="6%"
                                borderRadius="25%"
                                marginRight="10%"
                                press={() => setModalVisible(!modalVisible)}
                                titleStyle={styles.buttonText}
                            />
                            <Button
                                width="50%"
                                height="15%"
                                backgroundColor="#3F72AF"
                                title="Apply"
                                alignItems="center"
                                justifyContent="center"
                                marginTop="6%"
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