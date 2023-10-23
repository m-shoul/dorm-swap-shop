import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styleSheets/StyleSheet.js";
import { pickImages, getUserID } from "../../backend/dbFunctions.js";
import categories from "../components/Component.js";
import {
    getStorage,
    ref as sRef,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref, push, set } from "firebase/database";
import * as ImagePicker from "expo-image-picker";
import { database } from "../../backend/config/firebaseConfig";
import ListImagesComponent from "../assets/svg/list_images.js";
import RNPickerSelect from "react-native-picker-select";
import NavComponent from "../components/Component.js";

const CreatePostScreen = ({ navigation }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(null);
    const [condition, setCondition] = useState(null);

    // For uploading images
    const [image, setImage] = useState(null);

    // Function to pick images to upload to Firebase storage
    const pickImage = async () => {
        console.log("here");
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            console.log("here");
            setImage(result.assets[0].uri);

            // try {
            //     // await uploadImage(result.assets[0].uri);
            //     // return result.assets[0].uri;
            // } catch (error) {
            //     console.log("Error uploading image: ", error.message);
            // }
        }
    };

    // Get a reference to the storage database
    const storage = getStorage();

    // Reference to the realtime database

    const uploadImage = async (uri, dbRef) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = sRef(storage, "test/" + new Date().getTime());
        const uploadTask = uploadBytesResumable(storageRef, blob);

        // listen for events
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                setProgress(progress.toFixed());
            },
            (error) => {
                // handle error
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                    async (downloadURL) => {
                        console.log("File available at", downloadURL);
                        // save record
                        const newRecordRef = push(dbRef);
                        await set(newRecordRef, {
                            image: downloadURL,
                            timestamp: new Date().toISOString(),
                        });
                        setImage("");
                    }
                );
            }
        );
        // Testing purposes
        alert("Image uploaded");
    };

    // Function to create a listing
    const CreatePost = () => {
        // description
        // images
        // price
        // timeUpload "2023-09-13T12:00:00Z"
        // title
        // userId
        let userId = getUserID();
        try {
            writeListingData(title, description, price, userId, image);
            console.log("Post created successfully");
        } catch (error) {
            console.log(error);
        }

        navigation.navigate("HomeScreen");
    };

    function writeListingData(title, description, price, userId, image) {
        // Reference listings in database
        const listingReference = ref(database, "dorm_swap_shop/listings/");

        // Generates a unique ID
        const newListingReference = push(listingReference);

        // Gets the unique ID
        const listingId = newListingReference.key;

        // Gets image reference
        const dbRef = ref(
            getDatabase(),
            "/dorm_swap_shop/listings/" + listingId + "/images"
        );

        const listingData = {
            title: title,
            description: description,
            price: price,
            userId: userId,
            // timeUpload: firebase.database.ServerValue.TIMESTAMP
            timeUpload: Date.now(),
        };

        set(newListingReference, listingData);

        if (image) {
            uploadImage(image, dbRef);
        } else {
            console.log("No image set");
        }

        return listingId;
    }

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

    let validate = 0;
    useEffect(() => {
        console.log("Reached useEffect");
        // Trigger form validation when name, email, or password changes
        if (validate == 1) {
            validateForm();
        }
    }, [title, price, description]);

    const handleValidation = () => {
        console.log("Reached handleSubmit");
        validateForm();
        validate = 1;
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
            setCategoryStyle(styles.dropdownlistserror);
            emptyFields++;
            errorCount++;
        } else {
            setErrorMessageCategory("");
            setCategoryStyle(styles.dropdownlists);
        }

        if (condition === null) {
            setErrorMessageCondition("Condition is required.");
            setConditionStyle(styles.dropdownlistserror);
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
        // Set the errors and update form validity
        // setErrors(errors);
    };

    return (
        <SafeAreaView style={styles.background}>
            <View
                style={{
                    height: "15%",
                    paddingTop: "5%",
                    margin: 0,
                    marginBottom: -30,
                }}>
                <Text style={styles.postListingHeader}>Create Listing</Text>
            </View>
            <View style={styles.dividerLine} />
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
                    // marginBottom: 0,
                    //paddingBottom: 0,
                    justifyContent: "center",

                    alignItems: "center",
                    marginTop: "-10%",
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
                            <ListImagesComponent
                                source={require("../assets/svg/list_images.js")}
                                style={{
                                    width: 200,
                                    height: 28,
                                    stroke: "black",
                                    strokeWidth: 0.25,
                                    marginBottom: "5%",
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.forms, { height: "50%" }]}>
                        <TextInput
                            style={titleStyle}
                            onChangeText={(value) => setTitle(value)}
                            value={title}
                            placeholder="Title"
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
                            onChangeText={(value) => setPrice(value)}
                            value={price}
                            placeholder="Price"
                            inputMode="decimal"
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
                                onValueChange={(value) => setCategory(value)}
                                placeholder={{
                                    label: "Select a Category",
                                    value: null,
                                }}
                                items={[
                                    { label: "Books", value: "books" },
                                    { label: "Furniture", value: "furniture" },
                                    {
                                        label: "Appliances",
                                        value: "appliances",
                                    },
                                    {
                                        label: "Decorations",
                                        value: "decorations",
                                    },
                                    { label: "Other", value: "other" },
                                ]}
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
                                placeholder={{
                                    label: "Select a Condition",
                                    value: null,
                                }}
                                onValueChange={(value) => setCondition(value)}
                                items={[
                                    { label: "New", value: "new" },
                                    { label: "Like New", value: "like new" },
                                    { label: "Used", value: "used" },
                                    { label: "Damaged", value: "damaged" },
                                ]}
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
                            onChangeText={(value) => setDescription(value)}
                            multiline={true}
                            placeholder="Description"
                            style={descriptionStyle}
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
                                //paddingHorizontal: 20,
                                height: "12%",
                            }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#B3B3B3",
                                    borderRadius: "25%", //was 25
                                    width: "35%",
                                    marginRight: "5%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onPress={() =>
                                    navigation.navigate("HomeScreen")
                                }>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,

                                    borderRadius: "25%", //was 25

                                    alignItems: "center",
                                    justifyContent: "center",

                                    backgroundColor: "#3F72AF",
                                }}
                                //onPress={() => CreatePost()}
                                onPress={handleValidation}>
                                <Text style={styles.buttonText}>Post</Text>
                            </TouchableOpacity>
                            {/* Just for testing purposes 10/6/23 */}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <View style={{ height: "10%" }}>
                <NavComponent navigation={navigation} />
            </View>
            {/* 
            <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}>
                <Text>Home</Text>
            </TouchableOpacity> */}
        </SafeAreaView>
    );
};

export default CreatePostScreen;
