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
import { Image } from "expo-image";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { Button } from "../../components/Buttons.js";
import RoundHeader from "../../components/RoundHeader.js";
import { Ionicons } from "@expo/vector-icons";
import emailjs from "emailjs-com";
import { ShadowedView } from "react-native-fast-shadow";
import {
    RegExpMatcher,
    TextCensor,
    englishDataset,
    englishRecommendedTransformers,
    asteriskCensorStrategy,
} from "obscenity";

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
                router.push("Home");
            })
            .catch((error) => {
                console.error("ERROR --> Failed to send report email: ", error);
            });
    };

    const matcher = new RegExpMatcher({
        ...englishDataset.build(),
        ...englishRecommendedTransformers,
    });
    const censor = new TextCensor().setStrategy(asteriskCensorStrategy());
    const filterOutBadWords = (fieldName, value) => {
        const matches = matcher.getAllMatches(value);
        const filteredValue = censor.applyTo(value, matches);
        switch (fieldName) {
            case "description":
                setDescription(filteredValue);
                break;
            default:
                break;
        }
    };

    // For the modal that pops up.
    const [reportModalVisible, setReportModalVisible] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.background}>
                <RoundHeader height={230} />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* Need to add in the back arrow and the 
                        functionality of going back on click. */}
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={32} color="white" />
                    </TouchableOpacity>
                    {/* Title of page */}
                    <Text
                        style={[
                            styles.loginHeader,
                            { color: styles.colors.lightColor },
                        ]}>
                        Report Listing
                    </Text>
                </View>

                <View
                    style={{
                        width: "50%",
                        height: 200,
                        marginBottom: "2%",
                    }}>
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
                    </ShadowedView>
                </View>

                <View>
                    <Text style={styles.boldtext}>{title}</Text>
                </View>

                <View style={{ width: "80%", marginTop: "2%" }}>
                    <Text style={{ marginBottom: "5%", textAlign: "center" }}>
                        This listing will be reported to the Dorm Swap and Shop
                        admins. The reported listing will be reviewed and
                        further actions will be taken accordingly. Thank you.
                    </Text>

                    {/* Description text field to enter what is wrong with the post */}
                    <TextInput
                        style={{
                            //width: "80%",
                            height: 200,
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: "#B3B3B3",
                            backgroundColor: "white",
                            padding: "5%",
                            fontSize: 20,
                        }}
                        multiline={true}
                        value={description}
                        onChangeText={(value) => {
                            if (value.trim().length > 0) {
                                filterOutBadWords("description", value);
                            } else {
                                setDescription("");
                            }
                        }}
                        placeholder="Description"
                    />
                </View>

                {/* 2.) Flags the listing as reported... (not yet implemented) */}

                <Button
                    backgroundColor={styles.colors.darkAccentColor}
                    title="Report"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={25}
                    width="60%"
                    marginTop="5%"
                    press={sendEmail}
                    titleStyle={styles.buttonText}
                />
                {emailSent && <Text>Email sent successfully!</Text>}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
