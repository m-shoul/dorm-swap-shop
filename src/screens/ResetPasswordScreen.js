import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import React from "react";
import { useState } from "react";
import {
    getAuth,
    sendPasswordResetEmail,
    fetchSignInMethodsForEmail,
} from "firebase/auth";
import styles from "../styleSheets/StyleSheet.js";

const ResetPasswordScreen = ({ navigation }) => {
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

        fetchSignInMethodsForEmail(auth, email)
            .then((signInMethods) => {
                if (signInMethods.length === 0) {
                    setErrorMessageEmail("Email address is not registered.");
                    setEmailStyle(styles.createUserInputError);
                } else {
                    sendPasswordResetEmail(auth, email)
                        .then(() => {
                            alert("Password reset email sent.");
                        })
                        .catch((error) => {
                            console.log("Failed to send password reset email.");
                        });
                }
            })
            .catch((error) => {
                console.log("Error checking email existence.");
            });
    };

    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>Reset Password</Text>
            </View>
            <View
                style={{
                    backgroundColor: "#B3B3B3",
                    height: 1,
                    width: "90%",
                    marginBottom: 25,
                    marginTop: 40,
                }}
            />

            <View style={styles.forms}>
                <Text style={{ textAlign: "center", marginBottom: 25 }}>
                    Please enter the email address that is associated with your
                    account
                </Text>
                <TextInput
                    style={emailStyle}
                    placeholder="Email Address"
                    onChangeText={(value) => setEmail(value)}
                />
                {errorMessageEmail && (
                    <Text
                        style={{
                            color: "red",
                            //paddingBottom: 10,
                        }}
                    >
                        {errorMessageEmail}
                    </Text>
                )}
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={handleReset}>
                <Text style={styles.loginText}>Reset Password</Text>
            </TouchableOpacity>

            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("LoginScreen")}
                    style={styles.accountButtons}
                >
                    <Text>Already Have an Account?</Text>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ResetPasswordScreen;
