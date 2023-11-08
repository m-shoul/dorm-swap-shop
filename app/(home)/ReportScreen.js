import { Text, View, TouchableOpacity, Image, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard } from "react-native";
import styles from "../(aux)/StyleSheet";

// Imports for pulling the image from firebase...
import { pickImages, getUserID } from "../../backend/dbFunctions.js";
import categories from "../../components/Component.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, push, set } from "firebase/database";
import * as ImagePicker from 'expo-image-picker';
import { database } from '../../backend/config/firebaseConfig';
import BackButtonComponent from "../../assets/svg/back_button.js";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useRoute } from '@react-navigation/native';

// Imports for the email service. EmailJS...
import emailjs from 'emailjs-com';


export default function ReportScreen() {

    const route = useRoute();
    const { listing } = route.params;

    console.log(listing);

    // Sending the email to the admin.
    const [emailSent, setEmailSent] = useState(false);
    const [description, setDescription] = useState("");


    const sendEmail = () => {
        const templateParams = {
            to_email: 'dormswapnshop@gmail.com', // Recipient's email address
            message: description,                // For now its the shared Gmail we have...
        };

        emailjs.send(
            'service_8mkc6jy', // Email.js service ID
            'template_mnikow5', // Email.js template ID
            templateParams,
            'WhLg-6S2OWzKM5XFp' // Public key
        )
            .then(() => {
                setEmailSent(true);
                alert("Post reported. Thank you");
            })
            .catch((error) => {
                console.error('Email send error:', error);
            });
    };

    // For the modal that pops up.
    const [reportModalVisible, setReportModalVisible] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
            <SafeAreaProvider style={styles.background}>


                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* Need to add in the back arrow and the 
            functionality of going back on click. */}
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackButtonComponent />
                    </TouchableOpacity>

                    {/* Title of page */}

                    <Text style={styles.loginHeader}>Report Listing</Text>
                </View>

                {/* Display the first image of the reported listing
                The image is associated with whomever had posted the listing.
                So we need to somehow get that image from the listingID, from that
                specific user who is associated with the listingID.*/}
                <Image source={{ uri: listing.images }} style={{ width: "30%", height: "15%", marginBottom: "10%" }} />

                {/* Description text field to enter what is wrong with the post */}
                <TextInput
                    style={{
                        width: "80%", height: "40%", borderRadius: 20,
                        borderWidth: 1, borderColor: "#B3B3B3", backgroundColor: "white",
                        padding: "5%"
                    }}
                    multiline={true}
                    value={description}
                    onChangeText={(value) => setDescription(value)}
                    placeholder="Description"
                />


                {/* Report button that
            1.) Sends an email from to each of the developers to notify of the reported listing. (DONE)
            2.) Flags the listing as reported... (not yet implemented)
            3.) Directs to another page that tells user post was reported and has 2 buttons that can
            allow the user to return to the listing or return to the chat. (DONE) */}

                <TouchableOpacity style={styles.loginBtn} onPress={() => {
                    sendEmail();
                    router.push("PostReportedScreen")
                }}>
                    <Text style={styles.buttonText}>Send Email</Text>
                </TouchableOpacity>
                {emailSent && <Text>Email sent successfully!</Text>}

                <TouchableOpacity
                    onPress={() => router.push("PostReportedScreen")}>
                    <Text>Post reported (second screen)</Text>
                </TouchableOpacity>

            </SafeAreaProvider>
        </TouchableWithoutFeedback>
    );
};

