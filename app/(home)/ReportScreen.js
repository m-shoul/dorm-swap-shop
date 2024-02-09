import {
    Text,
    View,
    TouchableOpacity,
    //Image,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../(aux)/StyleSheet";
import { Image } from 'expo-image';
// Imports for pulling the image from firebase...
import BackButtonComponent from "../../assets/svg/back_button.js";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { Button } from "../../components/Buttons.js";
import RoundHeader from "../../components/RoundHeader.js";

//import { useRoute } from '@react-navigation/native';

// Imports for the email service. EmailJS...
import emailjs from "emailjs-com";

export default function ReportScreen() {
    const { image, title } = useLocalSearchParams();

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
                console.error("ERROR --> Failed to send report email: ", error);
            });
    };

    // For the modal that pops up.
    const [reportModalVisible, setReportModalVisible] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.background}>
                <RoundHeader height={"25%"} />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* Need to add in the back arrow and the 
                        functionality of going back on click. */}
                    <TouchableOpacity onPress={() => router.back()}>
                        <BackButtonComponent />
                    </TouchableOpacity>

                    {/* Title of page */}

                    <Text style={[styles.loginHeader, { color: "#F9F7F7" }]}>Report Listing</Text>
                </View>

                <View style={{
                    width: "50%",
                    height: "28%",
                    marginBottom: "2%",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.8,
                    shadowRadius: 3.84,
                    elevation: 5,

                }}>
                    <Image
                        source={{ uri: image }}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 20,
                        }}
                        key={image}
                    />
                </View>


                <View>
                    <Text style={styles.boldtext}>{title}</Text>
                </View>

                <View style={{ width: "80%", height: "40%", marginTop: "2%" }}>
                    <Text style={{ marginBottom: "5%" }}>This listing will be reported to the Dorm Swap and Shop admins.
                        The reported listing will be reviewed and further actions will be
                        taken accordingly. Thank you. </Text>

                    {/* Description text field to enter what is wrong with the post */}
                    <TextInput
                        style={{
                            //width: "80%",
                            height: "70%",
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
                </View>

                {/* 2.) Flags the listing as reported... (not yet implemented) */}

                <Button
                    backgroundColor="#3F72AF"
                    title="Report"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={25}
                    width="60%"
                    height="7%"
                    marginTop="5%"
                    press={sendEmail}
                    titleStyle={styles.buttonText}
                />
                {emailSent && <Text>Email sent successfully!</Text>}

            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
