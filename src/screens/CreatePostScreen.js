import { Text, TextInput, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from "react-native";
import React, {useState, useEffect} from "react";
import styles from "../styleSheets/StyleSheet.js";
import { pickImages, getUserID } from "../../backend/dbFunctions.js";
import categories from "../components/Component.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, push, set } from "firebase/database";
import * as ImagePicker from 'expo-image-picker';
import { database } from '../../backend/config/firebaseConfig';


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

    
    // Function to upload image to Firebase storage
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
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log("File available at", downloadURL);
                    // save record
                    const newRecordRef = push(dbRef);
                    await set(newRecordRef, {
                        image: downloadURL,
                        timestamp: new Date().toISOString(),
                    });
                    setImage("");
                });
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
        try{
            writeListingData(title, description, price, userId, image);
            console.log("Post created successfully");
        }
        catch(error){
            console.log(error);
        }

        navigation.navigate("HomeScreen");
    };

    function writeListingData(title, description, price, userId, image) {

        // Reference listings in database
        const listingReference = ref(database, 'dorm_swap_shop/listings/');

        // Generates a unique ID
        const newListingReference = push(listingReference);

        // Gets the unique ID
        const listingId = newListingReference.key;

        // Gets image reference
        const dbRef = ref(getDatabase(), "/dorm_swap_shop/listings/" + listingId + "/images");
    
        const listingData = {
            title: title,
            description: description,
            price: price,
            userId: userId,
            // timeUpload: firebase.database.ServerValue.TIMESTAMP
            timeUpload: Date.now()
        };
    
        set(newListingReference, listingData);

        if (image) {
            uploadImage(image, dbRef);

        } else {
            console.log("No image set");
        }
    
        return listingId;
    }

    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>Create Post</Text>
            </View>

            <TouchableOpacity
                onPress={() => pickImage()}>
                <Text>Upload Image</Text>
            </TouchableOpacity>

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