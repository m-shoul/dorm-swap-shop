import { Text, TextInput, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styleSheets/StyleSheet.js";
import { getUserID } from "../../backend/dbFunctions.js";
//import categories from "../components/Component.js";
import * as ImagePicker from 'expo-image-picker';
import { createListing } from "../../backend/api/listing.js";


const CreatePostScreen = ({ navigation }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    // For uploading images
    const [image, setImage] = useState(null);

    // Function to pick images to upload to Firebase storage
    const pickImage = async () => {
        console.log("Picking Image");
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.canceled) {
            console.log("Image picked successfully");
            setImage(result.assets[0].uri);
        }
    };

    // Function to create a listing
    const CreatePost = () => {
        let userId = getUserID();
        try {
            createListing(title, description, price, userId, image);
            console.log("Post created successfully");
        }
        catch (error) {
            console.log(error);
        }

        navigation.navigate("HomeScreen");
    };

    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>Create Post</Text>
            </View>

            <TouchableOpacity
                onPress={() => pickImage()}>
                <Text>Upload Image</Text>
            </TouchableOpacity>

            {/* Category (dropdown) */}

            <View style={styles.container}>
                <Text style={styles.text}>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTitle}
                    value={title}
                    placeholder="Title"
                />
                <Text style={styles.text}>Description</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Description"
                />
                <Text style={styles.text}>Price</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPrice}
                    value={price}
                    placeholder="Price"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => CreatePost()}>
                    <Text style={styles.buttonText}>Create Post</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("HomeScreen")}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

                {/* Just for testing purposes 10/6/23 */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("ReportScreen")}>
                    <Text>Report Screen</Text>
                </TouchableOpacity>
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