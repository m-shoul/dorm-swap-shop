import {
    Text,
    View,
    TextInput,
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
import styles from "../(aux)/StyleSheet";
import { router } from 'expo-router';

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
                router.push("LoginScreen");
            })
            .catch((error) => {
                console.log("Failed to send password reset email: ", error);
            });
    };

    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>Reset Password</Text>
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
                <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>

            <View>
                <TouchableOpacity
                    onPress={() => router.push('/')}
                    style={styles.accountButtons}
                >
                    <Text>Already Have an Account?</Text>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};