import {
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import styles from "../(aux)/StyleSheet";

// Imports for pulling the image from firebase...
import BackButtonComponent from "../../assets/svg/back_button.js";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { Button } from "../../components/Buttons.js";

//import { useRoute } from '@react-navigation/native';

// Imports for the email service. EmailJS...
import emailjs from "emailjs-com";

export default function ReportScreen() {
    const item = useLocalSearchParams();

    console.log("listing" + item);

    // Sending the email to the admin.
    const [emailSent, setEmailSent] = useState(false);
    const [description, setDescription] = useState("");

    const sendEmail = () => {
        const templateParams = {
            to_email: "dormswapnshop@gmail.com", // Recipient's email address
            message: description, // For now its the shared Gmail we have...
        };

        emailjs
            .send(
                "service_8mkc6jy", // Email.js service ID
                "template_mnikow5", // Email.js template ID
                templateParams,
                "WhLg-6S2OWzKM5XFp" // Public key
            )
            .then(() => {
                setEmailSent(true);
                alert("Post reported. Thank you");
                console.log("Email send successfully");
                router.push("PostReportedScreen");
            })
            .catch((error) => {
                console.error("Email send error:", error);
            });
    };

    // For the modal that pops up.
    const [reportModalVisible, setReportModalVisible] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.background}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* Need to add in the back arrow and the 
            functionality of going back on click. */}
                    <TouchableOpacity onPress={() => router.back()}>
                        <BackButtonComponent />
                    </TouchableOpacity>

                    {/* Title of page */}

                    <Text style={styles.loginHeader}>Report Listing</Text>
                </View>

                <Image
                    //source={{ uri: listing.images }}
                    style={{ width: "30%", height: "15%", marginBottom: "10%" }}
                />

                {/* Description text field to enter what is wrong with the post */}
                <TextInput
                    style={{
                        width: "80%",
                        height: "40%",
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: "#B3B3B3",
                        backgroundColor: "white",
                        padding: "5%",
                        fontSize: 20,
                    }}
                    multiline={true}
                    value={description}
                    onChangeText={(value) => setDescription(value)}
                    placeholder="Description"
                />

                {/* 2.) Flags the listing as reported... (not yet implemented) */}

                <Button
                    backgroundColor="#3F72AF"
                    title="Send Email"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="25%"
                    width="80%"
                    height="7%"
                    marginTop="12%"
                    press={sendEmail}
                    titleStyle={styles.buttonText}
                />
                {emailSent && <Text>Email sent successfully!</Text>}

                <TouchableOpacity
                    onPress={() => router.push("PostReportedScreen")}>
                    <Text>Post reported (second screen)</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
