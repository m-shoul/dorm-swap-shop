import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useState } from "react";
import {
    getAuth,
    sendPasswordResetEmail,
    fetchSignInMethodsForEmail,
} from "firebase/auth";
import styles from "../(aux)/StyleSheet";
import { router } from "expo-router";
import { Button } from "../../components/Buttons.js";
import RoundHeader from "../../components/RoundHeader.js";
import ResetPasswordIcon from "../../assets/svg/reset_password_icon.js";
import { ShadowedView } from 'react-native-fast-shadow';
import { RegExpMatcher, TextCensor, englishDataset, englishRecommendedTransformers, asteriskCensorStrategy } from "obscenity";

export default function ResetPasswordScreen() {
    const [email, setEmail] = useState("");
    const [emailStyle, setEmailStyle] = useState(styles.createUserInput);
    const [errorMessageEmail, setErrorMessageEmail] = useState("");

    const handleReset = () => {
        const auth = getAuth();

        if (!email) {
            setErrorMessageEmail("Please enter an email address.");
            setEmailStyle(styles.createUserInputError);
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessageEmail("Please enter a valid email address.");
            setEmailStyle(styles.createUserInputError);
            return;
        } else {
            setEmailStyle(styles.createUserInput);
            setErrorMessageEmail("");
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Password reset email sent.");
                router.push("/");
            })
            .catch((error) => {
                console.log("Failed to send password reset email: ", error);
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
            case "email":
                setEmail(filteredValue);
                break;
            default:
                break;
        }
    };

    return (
        <SafeAreaView style={styles.background}>
            <StatusBar barStyle="light-content" />
            <RoundHeader height={150} />

            <ShadowedView
                style={{
                    marginTop: "10%",
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
                <ResetPasswordIcon />


            </ShadowedView>

            <View>
                <Text style={styles.loginHeader}>Reset Password</Text>
            </View>
            <View style={styles.dividerLine} />

            <View style={styles.forms}>
                <Text style={{ textAlign: "center", marginBottom: 25 }}>
                    Please enter the email address that is associated with your
                    account
                </Text>
                <TextInput
                    style={emailStyle}
                    placeholder="Email Address"
                    value={email}
                    onChangeText={(value) => {
                        if (value.trim().length > 0) {
                            filterOutBadWords("email", value);
                        } else {
                            setEmail("");
                        }
                    }}
                />
                {errorMessageEmail && (
                    <Text
                        style={{
                            color: "red",
                            //paddingBottom: 10,
                        }}>
                        {errorMessageEmail}
                    </Text>
                )}
            </View>

            {/* <TouchableOpacity style={styles.loginBtn} onPress={handleReset}>
                <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity> */}
            <Button
                width="80%"
                backgroundColor={styles.colors.darkAccentColor}
                title="Reset Password"
                alignItems="center"
                justifyContent="center"
                marginTop="6%"
                marginBottom="6%"
                borderRadius={25}
                press={handleReset}
                titleStyle={styles.buttonText}
            />

            <View>
                <TouchableOpacity
                    onPress={() => router.push("/")}
                    style={styles.notUserButton}>
                    <Text style={styles.notUserButtonText}>
                        Already have an account?
                    </Text>
                    <Text style={styles.notUserButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
