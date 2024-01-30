import {
    Keyboard,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    //Image,
    Dimensions,
} from "react-native";
import { Image } from "expo-image";
import React, { useState, useEffect, useRef } from "react";
import styles from "../(aux)/StyleSheet.js";
import { getUserID } from "../../backend/dbFunctions.js";
import { categories, conditions } from "../../components/Enums.js";
import * as ImagePicker from "expo-image-picker";
import ListImagesComponent from "../../assets/svg/list_images.js";
import RNPickerSelect from "react-native-picker-select";
import { createListing } from "../../backend/api/listing.js";
import { router, useNavigation } from "expo-router";
import { Button } from '../../components/Buttons.js';
import RoundHeader from "../../components/RoundHeader.js";

export default function CreatePostScreen() {
    const navigation = useNavigation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(null);
    const [condition, setCondition] = useState(null);
    const [location, setLocation] = useState("");

    //For pickers so they can get the right text size
    const { width } = Dimensions.get("window");
    const NormalFontSize = 20;
    normalText = width / NormalFontSize;
    // For uploading images
    const [image, setImage] = useState(null);

    // Function to pick images to upload to Firebase storage
    const pickImage = async () => {
        console.log("Picking Image");
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Image,
            allowsMultipleSelection: true,
            selectionLimit: 3,
            aspect: [4, 3],
            quality: 0.2,
        });

        if (result.assets && result.assets.length > 0) {
            const selectedImages = result.assets.map((asset) => asset.uri);
            setImage(selectedImages);
        }
    };

    // Function to create a listing
    const CreatePost = () => {
        let userId = getUserID();
        try {
            createListing(
                userId,
                title,
                description,
                price,
                category,
                condition,
                "location - replace with param in future",
                image
            );
            console.log("Post created successfully");
        } catch (error) {
            console.log(error);
        }

        router.push("Home");
    };

    const [titleStyle, setTitleStyle] = useState(styles.createUserInput);
    const [priceStyle, setPriceStyle] = useState(styles.createUserInput);
    const [descriptionStyle, setDescriptionStyle] = useState(
        styles.postListingDescription
    );
    const [categoryStyle, setCategoryStyle] = useState(styles.dropdownlists);
    const [conditionStyle, setConditionStyle] = useState(styles.dropdownlists);

    //All of the states that are used to store the error messages
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageTitle, setErrorMessageTitle] = useState("");
    const [errorMessagePrice, setErrorMessagePrice] = useState("");
    const [errorMessageCategory, setErrorMessageCategory] = useState("");
    const [errorMessageCondition, setErrorMessageCondition] = useState("");
    const [errorMessageDescription, setErrorMessageDescription] = useState("");

    const titleInputRef = useRef(null);
    const priceInputRef = useRef(null);
    const descriptionInputRef = useRef(null);
    const categoryInputRef = useRef(null);
    const conditionInputRef = useRef(null);

    let validate = 0;
    useEffect(() => {
        // console.log("Reached useEffect");

        const unsubscribeBlur = navigation.addListener("blur", () => {
            // You can put any logic you want to execute when the screen is unfocused here
            clearTextInputs();
        });

        // Trigger form validation when name, email, or password changes
        if (validate == 1) {
            validateForm();
        }

        return () => {
            unsubscribeBlur();
        };
    }, [title, price, description, navigation]);

    const handleValidation = () => {
        console.log("Reached handleSubmit");
        validateForm();
        validate = 1;
    };

    const clearTextInputs = () => {
        setTitle("");
        setPrice("");
        setDescription("");
        setCategory(null);
        setCondition(null);
        setImage(null);
    };

    const validateForm = () => {
        let errorCount = 0;
        let emptyFields = 0;
        console.log("Reached validateForm");
        console.log(validate);
        // Validate first name field

        //validate last name field
        if (!title) {
            setErrorMessageTitle("Title is required.");
            setTitleStyle(styles.createUserInputError);
            emptyFields++;
            errorCount++;
        } else {
            setErrorMessageTitle("");
            setTitleStyle(styles.createUserInput);
        }

        //validate username field
        if (!price) {
            setErrorMessagePrice("Price is required.");
            setPriceStyle(styles.createUserInputError);
            emptyFields++;
            errorCount++;
        } else {
            setErrorMessagePrice("");
            setPriceStyle(styles.createUserInput);
        }

        if (category === null) {
            setErrorMessageCategory("Category is required.");
            setCategoryStyle(styles.dropDownListsError);
            emptyFields++;
            errorCount++;
        } else {
            setErrorMessageCategory("");
            setCategoryStyle(styles.dropdownlists);
        }

        if (condition === null) {
            setErrorMessageCondition("Condition is required.");
            setConditionStyle(styles.dropDownListsError);
            emptyFields++;
            errorCount++;
        } else {
            setErrorMessageCondition("");
            setConditionStyle(styles.dropdownlists);
        }

        if (!description) {
            setErrorMessageDescription("Description is required.");
            setDescriptionStyle(styles.postListingDescriptionError);
            emptyFields++;
            errorCount++;
        } else if (description.length > 300) {
            setErrorMessageDescription(
                "Description must be less than 300 characters."
            );
            setDescriptionStyle(styles.postListingDescriptionError);

            errorCount++;
        } else {
            setErrorMessageDescription("");
            setDescriptionStyle(styles.postListingDescription);
        }

        // Validate email field
        if (emptyFields > 1) {
            setErrorMessage("Please fill out all fields.");
            setErrorMessageTitle("");
            setErrorMessagePrice("");
            setErrorMessageCategory("");
            setErrorMessageCondition("");
            setErrorMessageDescription("");
        } else {
            setErrorMessage("");
        }

        if (errorCount === 0) {
            CreatePost();
            console.log("Post created successfully");
        }
    };

    return (
        <SafeAreaView style={styles.background}>
            <RoundHeader height="35%" />
            <View
                style={{
                    height: "15%",
                    paddingTop: "5%",
                    //margin: 0,
                    marginBottom: -10,
                    width: "100%",
                    alignItems: "center",
                }}>
                <Text style={[styles.postListingHeader, { marginBottom: "7%", color: "#F9F7F7" }]}>Create Listing</Text>
                <View style={styles.dividerLine} />
            </View>

            {errorMessage && (
                <Text
                    style={{
                        color: "red",
                        paddingBottom: 10,
                        marginTop: -15,
                    }}>
                    {errorMessage}
                </Text>
            )}
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "-10%",
                    //zIndex: -1,
                }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView
                    automaticallyAdjustKeyboardInsets={true}
                    style={{
                        flex: 1,
                        KeyboardAvoidingView: "enabled",
                        width: "100%",
                    }}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    keyboardShouldPersistTaps="handled">
                    <View>
                        <TouchableOpacity onPress={() => pickImage()}>
                            {image ? (
                                <Image
                                    source={{ uri: image[0] }}
                                    style={{
                                        width: 200,
                                        height: 200,
                                        marginBottom: "5%",
                                    }}
                                />
                            ) : (
                                <ListImagesComponent
                                    //source={require("../../assets/svg/list_images.js")}
                                    style={{
                                        width: 200,
                                        height: 28,
                                        // stroke: "black",
                                        // strokeWidth: 0.25,
                                        marginBottom: "5%",
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 4,
                                        },
                                        shadowOpacity: 0.8,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                    }}
                                />
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.forms, { height: "50%" }]}>
                        <TextInput
                            maxLength={25}
                            style={titleStyle}
                            blurOnSubmit={false}
                            onChangeText={(value) => setTitle(value)}
                            value={title}
                            placeholder="Title"
                            onSubmitEditing={() => {
                                priceInputRef.current.focus();
                            }}
                            ref={titleInputRef}
                        />
                        {errorMessageTitle && (
                            <Text
                                style={{
                                    color: "red",
                                    paddingBottom: 10,
                                    marginTop: -15,
                                }}>
                                {errorMessageTitle}
                            </Text>
                        )}
                        <TextInput
                            style={priceStyle}
                            maxLength={5}
                            blurOnSubmit={false}
                            onChangeText={(value) => setPrice(value)}
                            value={price}
                            returnKeyType="done"
                            placeholder="Price"
                            inputMode="decimal"
                            ref={priceInputRef}
                            onBlur={() => {
                                Keyboard.dismiss();
                                categoryInputRef.current.togglePicker();
                            }}
                            onSubmitEditing={() => {
                                Keyboard.dismiss();
                            }}
                        />
                        {errorMessagePrice && (
                            <Text
                                style={{
                                    color: "red",
                                    paddingBottom: 10,
                                    marginTop: -15,
                                }}>
                                {errorMessagePrice}
                            </Text>
                        )}
                        <View style={categoryStyle}>
                            <RNPickerSelect
                                returnKeyType="done"
                                blurOnSubmit={false}
                                onValueChange={(value) => {
                                    Keyboard.dismiss();
                                    setCategory(value);
                                }}
                                onDonePress={() => {
                                    conditionInputRef.current.togglePicker();
                                }}
                                placeholder={{
                                    label: "Select a Category",
                                    value: null,
                                }}
                                onSubmitEditing={() => {
                                    Keyboard.dismiss();
                                }}
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
                        </View>
                        {errorMessageCategory && (
                            <Text
                                style={{
                                    color: "red",
                                    paddingBottom: 10,
                                    marginTop: -15,
                                }}>
                                {errorMessageCategory}
                            </Text>
                        )}
                        <View style={conditionStyle}>
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
                                onDonePress={() => {
                                    Keyboard.dismiss();
                                    setTimeout(() => {
                                        descriptionInputRef.current.focus();
                                    }, 100);
                                }}
                                onValueChange={(value) => {
                                    Keyboard.dismiss();
                                    setCondition(value);
                                }}
                                onSubmitEditing={() => {
                                    Keyboard.dismiss();
                                }}
                                ref={conditionInputRef}
                                items={conditions}
                                style={{
                                    inputIOS: {
                                        fontSize: normalText, // Change this to your desired font size
                                    },
                                    inputAndroid: {
                                        fontSize: normalText, // Change this to your desired font size
                                    },
                                }}
                            />
                        </View>

                        {errorMessageCondition && (
                            <Text
                                style={{
                                    color: "red",
                                    paddingBottom: 10,
                                    marginTop: -15,
                                }}>
                                {errorMessageCondition}
                            </Text>
                        )}

                        <TextInput
                            blurOnSubmit={false}
                            onChangeText={(value) => setDescription(value)}
                            multiline={true}
                            value={description}
                            maxLength={250}
                            placeholder="Description"
                            style={descriptionStyle}
                            ref={descriptionInputRef}
                        />

                        {errorMessageDescription && (
                            <Text
                                style={{
                                    color: "red",
                                    paddingBottom: 0,
                                    marginBottom: -20,
                                    marginTop: 15,
                                }}>
                                {errorMessageDescription}
                            </Text>
                        )}
                        <View
                            style={{
                                flexDirection: "row",
                                marginTop: "10%",
                                justifyContent: "space-between",
                                height: "12%",
                            }}>
                            {/* Cancel Button */}
                            <Button
                                width="35%"
                                backgroundColor="#B3B3B3"
                                title="Cancel"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius="25%"
                                press={clearTextInputs}
                                marginRight="5%"
                                titleStyle={styles.buttonText}
                            />

                            {/* Post Button */}
                            <Button
                                backgroundColor="#3F72AF"
                                title="Post"
                                alignItems="center"
                                flex="1"
                                justifyContent="center"
                                borderRadius="25%"
                                press={handleValidation}
                                titleStyle={styles.buttonText}
                            />
                            {/* Just for testing purposes 10/6/23 */}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView>
    );
}
