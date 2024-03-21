import {
    Keyboard,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
import { Button } from "../../components/Buttons.js";
import RoundHeader from "../../components/RoundHeader.js";
import ExpandComponent from "../../assets/svg/expand_icon.js";
import { ShadowedView } from "react-native-fast-shadow";
import { useStore } from "../global.js";

// Obscenity
import {
    RegExpMatcher,
    TextCensor,
    englishDataset,
    englishRecommendedTransformers,
    asteriskCensorStrategy,
} from "obscenity";

export default function CreatePostScreen() {
    const navigation = useNavigation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(null);
    const [condition, setCondition] = useState(null);
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [setGlobalReload] = useStore((state) => [state.setGlobalReload]);

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

    const [isImageLoading, setIsImageLoading] = useStore((state) => [
        state.isImageLoading,
        state.setIsImageLoading,
    ]);
    // Function to create a listing
    const CreatePost = async () => {
        setIsImageLoading(true);
        let userId = getUserID();
        try {
            console.log("made it: 21 ");
            router.push("Home");
            await createListing(
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
            setIsImageLoading(false);
            console.error("ERROR --> Failed to create post: ", error);
        } finally {
            setIsImageLoading(false);
            setGlobalReload(true);

            console.log("made it: ");
        }
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
    const insets = useSafeAreaInsets();

    // Obscenity - filtering out inappropriate text
    const matcher = new RegExpMatcher({
        ...englishDataset.build(),
        ...englishRecommendedTransformers,
    });
    const censor = new TextCensor().setStrategy(asteriskCensorStrategy());
    const filterOutBadWords = (fieldName, value) => {
        const matches = matcher.getAllMatches(value);
        const filteredValue = censor.applyTo(value, matches);
        switch (fieldName) {
            case "title":
                setTitle(filteredValue);
                break;
            case "description":
                setDescription(filteredValue);
                break;
            default:
                break;
        }
    };

    let validate = 0;
    useEffect(
        () => {
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
        },
        [
            /*title, price, description, navigation*/
        ]
    );

    const handleValidation = () => {
        validateForm();
        validate = 1;
    };

    const clearTextInputs = () => {
        router.push("Home");
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
        <View style={[styles.background, { paddingTop: insets.top }]}>
            <RoundHeader height={260} />
            <View
                style={{
                    paddingTop: "5%",
                    width: "100%",
                    alignItems: "center",
                }}>
                <Text
                    style={[
                        styles.postListingHeader,
                        {
                            marginBottom: "7%",
                            color: styles.colors.lightColor,
                        },
                    ]}>
                    Post Listing
                </Text>
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
                        alignItems: "center",
                    }}
                    keyboardShouldPersistTaps="handled">
                    <View style={{ marginBottom: "2%" }}>
                        <ShadowedView
                            style={{
                                height: 200,
                                shadowOpacity: 0.8,
                                shadowRadius: 40,
                                shadowOffset: {
                                    width: 5,
                                    height: 3,
                                },
                                backgroundColor: "white",
                                borderRadius: 20,
                                marginBottom: "2%",
                            }}>
                            <TouchableOpacity onPress={() => pickImage()}>
                                {image ? (
                                    <Image
                                        source={{ uri: image[0] }}
                                        style={{
                                            width: 200,
                                            height: 200,
                                            marginBottom: "2%",
                                            borderRadius: 20,
                                        }}
                                    />
                                ) : (
                                    <ListImagesComponent
                                        style={{
                                            width: 200,
                                            height: 28,
                                        }}
                                    />
                                )}
                            </TouchableOpacity>
                        </ShadowedView>
                        <Text style={{ textAlign: "center" }}>
                            Upload Images
                        </Text>
                    </View>

                    <View style={styles.forms}>
                        <TextInput
                            maxLength={25}
                            style={titleStyle}
                            blurOnSubmit={false}
                            onChangeText={(value) => {
                                if (value.trim().length > 0) {
                                    filterOutBadWords("title", value);
                                } else {
                                    setTitle("");
                                }
                            }}
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
                            blurOnSubmit={false}
                            onChangeText={(value) => {
                                // Define the regular expression for the required format
                                let regex = /^\d{1,5}(\.\d{0,2})?$/;

                                // Check if the input value matches the required format
                                if (!regex.test(value)) {
                                    // Check if the input value contains more than one period
                                    let periodCount = (value.match(/\./g) || [])
                                        .length;
                                    if (periodCount > 1) {
                                        // If it does, remove the extra periods
                                        let firstPeriodIndex =
                                            value.indexOf(".");
                                        value = value.replace(
                                            /\./g,
                                            (match, index) =>
                                                index === firstPeriodIndex
                                                    ? "."
                                                    : ""
                                        );
                                    }

                                    // Split the value into the part before the period and the part after the period
                                    let parts = value.split(".");

                                    // Limit the part before the period to 5 characters
                                    if (parts[0].length > 5) {
                                        parts[0] = parts[0].substring(0, 5);
                                    }

                                    // If there is a part after the period, limit it to 2 characters
                                    if (parts[1] && parts[1].length > 2) {
                                        parts[1] = parts[1].substring(0, 2);
                                    }

                                    // Combine the parts back into the corrected value
                                    value = parts.join(".");
                                }
                                setPrice(value);
                            }}
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
                                    },
                                }}
                                Icon={() => {
                                    return <ExpandComponent />;
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
                                    },
                                }}
                                Icon={() => {
                                    return <ExpandComponent />;
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
                            onChangeText={(value) => {
                                if (value.trim().length > 0) {
                                    filterOutBadWords("description", value);
                                } else {
                                    setDescription("");
                                }
                            }}
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
                            }}>
                            {/* Cancel Button */}
                            <Button
                                width="35%"
                                backgroundColor="#B3B3B3"
                                title="Cancel"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius={25}
                                press={clearTextInputs}
                                marginRight="5%"
                                titleStyle={styles.buttonText}
                            />

                            {/* Post Button */}
                            <Button
                                backgroundColor={styles.colors.darkAccentColor}
                                title="Post"
                                alignItems="center"
                                width="60%"
                                justifyContent="center"
                                borderRadius={25}
                                press={handleValidation}
                                titleStyle={styles.buttonText}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
