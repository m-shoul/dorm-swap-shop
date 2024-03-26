import {
    Keyboard,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
} from "react-native";
import {
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Image } from "expo-image";
import React, { useState, useEffect, useRef } from "react";
import styles from "../(aux)/StyleSheet.js";
import { categories, conditions } from "../../components/Enums.js";
import * as ImagePicker from "expo-image-picker";
import ListImagesComponent from "../../assets/svg/list_images.js";
import RNPickerSelect from "react-native-picker-select";
import { updateListing, getIndividualListing } from "../../backend/api/listing.js";
import { router, useNavigation, useLocalSearchParams } from "expo-router";
import { Button } from '../../components/Buttons.js';
import RoundHeader from "../../components/RoundHeader.js";
import ExpandComponent from "../../assets/svg/expand_icon.js";
import { RegExpMatcher, TextCensor, englishDataset, englishRecommendedTransformers, asteriskCensorStrategy } from "obscenity";
import { ShadowedView } from 'react-native-fast-shadow';
import { useStore } from "../global.js";

export default function EditListings() {
    const { listingId } = useLocalSearchParams();

    // Auto refresh
    const [setGlobalReload] = useStore((state) => [state.setGlobalReload]);

    const navigation = useNavigation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(null);
    const [condition, setCondition] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [titleStyle, setTitleStyle] = useState(styles.createUserInput);
    const [priceStyle, setPriceStyle] = useState(styles.createUserInput);
    const [descriptionStyle, setDescriptionStyle] = useState(
        styles.postListingDescription
    );
    const [categoryStyle, setCategoryStyle] = useState(styles.dropdownlists);
    const [conditionStyle, setConditionStyle] = useState(styles.dropdownlists);

    const titleInputRef = useRef(null);
    const priceInputRef = useRef(null);
    const descriptionInputRef = useRef(null);
    const categoryInputRef = useRef(null);
    const conditionInputRef = useRef(null);

    const insets = useSafeAreaInsets();

    const { width } = Dimensions.get("window");
    const NormalFontSize = 20;
    const normalText = width / NormalFontSize;

    const fetchIndividualUserListing = async () => {
        try {
            const listing = await getIndividualListing(listingId);
            setTitle(listing.title);
            setDescription(listing.description);
            setPrice(listing.price);
            setCategory(listing.category);
            setCondition(listing.condition);
            setImage(listing.images);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    // Images
    const [image, setImage] = useState(null);

    // Function to pick images to upload to Firebase storage
    const pickImage = async () => {
        console.log("Updating Image");
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

    useEffect(() => {
        console.log("trigger use effect");
        fetchIndividualUserListing();
    }, []);

    const handleUpdate = async () => {
        await updateListing(listingId, title, description, price, category, condition, image);
        setGlobalReload(true);
        router.push("(home)/MyListingsScreen");
    };

    // Clearing input on cancel
    const clearTextInputs = () => {
        router.push("Home");
        setTitle("");
        setPrice("");
        setDescription("");
        setCategory(null);
        setCondition(null);
        setImage(null);
    };

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
                        { marginBottom: "7%", color: styles.colors.lightColor },
                    ]}>
                    Edit Listing
                </Text>
                <View style={styles.dividerLine} />
            </View>
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
                                shadowOpacity: 0.8,
                                shadowRadius: 20,
                                shadowOffset: {
                                    width: 5,
                                    height: 3,
                                },
                                backgroundColor: "white",
                                borderRadius: 20,
                            }}
                        >
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
                        <Text style={{ textAlign: "center" }}>Change Image</Text>
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
                            placeholder={title ? title : "Title"}
                            value={title}
                            onSubmitEditing={() => {
                                priceInputRef.current.focus();
                            }}
                            ref={titleInputRef}
                        />
                        <TextInput
                            style={priceStyle}
                            blurOnSubmit={false}
                            onChangeText={(value) => {
                                // Define the regular expression for the required format
                                let regex = /^\d{1,5}(\.\d{0,2})?$/;

                                // Check if the input value matches the required format
                                if (!regex.test(value)) {
                                    // If not, correct it

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

                                // Update the price state
                                setPrice(value);
                            }}
                            returnKeyType="done"
                            placeholder={price ? price : "Price"}
                            value={price}
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
                                        paddingTop: "2%", //was 7
                                        paddingLeft: "5%",
                                        fontSize: normalText, // Change this to your desired font size
                                    },
                                    inputAndroid: {
                                        marginTop: -8,
                                        fontSize: normalText, // Change this to your desired font size
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
                                        paddingTop: "2%", //was 7
                                        paddingLeft: "5%",
                                        fontSize: normalText, // Change this to your desired font size
                                    },
                                    inputAndroid: {
                                        marginTop: -8,
                                        fontSize: normalText, // Change this to your desired font size
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
                            maxLength={250}
                            placeholder={description ? description : "Description"}
                            value={description}
                            style={descriptionStyle}
                            ref={descriptionInputRef}
                        />
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
                            {/* Update Button */}
                            <Button
                                backgroundColor={styles.colors.darkAccentColor}
                                title="Update"
                                alignItems="center"
                                width="60%"
                                justifyContent="center"
                                borderRadius={25}
                                press={handleUpdate}
                                titleStyle={styles.buttonText}
                            />
                            {/* Just for testing purposes 10/6/23 */}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};
