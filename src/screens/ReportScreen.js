import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, push, set } from "firebase/database";
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "../styleSheets/StyleSheet.js";



const ReportScreen = ({ navigation }) => {

    const [image, setImage] = useState(null);

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

            try {
                await uploadImage(result.assets[0].uri);
            } catch (error) {
                console.log("Error uploading image: ", error.message);
            } 
        }
    };

    // Get a reference to the storage database
    const storage = getStorage();

    // Reference to the realtime database
    const dbRef = ref(getDatabase(), "/dorm_swap_shop");

    const uploadImage = async (uri) => {
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
    };



    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>Report</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}>
                <Text>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => pickImage()}>
                <Text>Upload Image</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ReportScreen;