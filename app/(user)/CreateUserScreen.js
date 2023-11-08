import {
    Text,
    View,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";
import React from "react";
import styles from "../(aux)/StyleSheet.js";
import { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { writeUserData } from "../../backend/dbFunctions.js";
import { createUser } from "../../backend/api/user.js";
import { router } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function CreateUserScreen() {
    //All of the states that are used to store the actual values of the text inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");

    // Email and password needed for auth
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    //All of the states that are used to store the styles
    const [firstNameStyle, setFirstNameStyle] = useState(
        styles.createUserInput
    );
    const [lastNameStyle, setLastNameStyle] = useState(styles.createUserInput);
    const [usernameStyle, setUsernameStyle] = useState(styles.createUserInput);
    const [emailStyle, setEmailStyle] = useState(styles.createUserInput);
    const [passwordStyle, setPasswordStyle] = useState(styles.createUserInput);
    const [passwordCheckStyle, setPasswordCheckStyle] = useState(
        styles.createUserInput
    );

    //All of the states that are used to store the error messages
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageFirst, setErrorMessageFirst] = useState("");
    const [errorMessageLast, setErrorMessageLast] = useState("");
    const [errorMessageUsername, setErrorMessageUsername] = useState("");
    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");
    const [errorMessageConfirm, setErrorMessageConfirm] = useState("");

    let validate = 0;
    useEffect(() => {
        console.log("Reached useEffect");
        // Trigger form validation when name, email, or password changes
        if (validate == 1) {
            validateForm();
        }
    }, [firstName, lastName, username, email, password, passwordCheck]);

    const handleValidation = () => {
        console.log("Reached handleSubmit");
        validateForm();
        validate = 1;
    };

    const validateForm = () => {
        let errorCount = 0;
        let emptyFields = 0;
        console.log("Reached validateForm");
        console.log(validate);
        // Validate first name field
        if (!firstName) {
            setErrorMessageFirst("First name is required.");
            setFirstNameStyle(styles.createUserInputError);
            emptyFields++;

            errorCount++;
        } else {
            setErrorMessageFirst("");
            setFirstNameStyle(styles.createUserInput);
        }
        //validate last name field
        if (!lastName) {
            setErrorMessageLast("Last name is required.");
            setLastNameStyle(styles.createUserInputError);
            emptyFields++;
            errorCount++;
        } else {
            setErrorMessageLast("");
            setLastNameStyle(styles.createUserInput);
        }
        //validate username field
        if (!username) {
            setErrorMessageUsername("Username is required.");
            setUsernameStyle(styles.createUserInputError);
            emptyFields++;
            errorCount++;
        } else {
            setErrorMessageUsername("");
            setUsernameStyle(styles.createUserInput);
        }

        // Validate email field
        if (!email) {
            setErrorMessageEmail("Email is required.");
            setEmailStyle(styles.createUserInputError);
            emptyFields++;
            errorCount++;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessageEmail("Email is invalid.");
            setEmailStyle(styles.createUserInputError);
            errorCount++;
        } else {
            setErrorMessageEmail("");
            setEmailStyle(styles.createUserInput);
        }

        // Validate password field
        if (!password) {
            setErrorMessagePassword("Password is required.");
            setPasswordStyle(styles.createUserInputError);
            emptyFields++;
            errorCount++;
        } else if (password.length < 6) {
            setErrorMessagePassword("Password must be at least 6 characters.");
            setPasswordStyle(styles.createUserInputError);
            emptyFields++;
            errorCount++;
        } else {
            setErrorMessagePassword("");
            setPasswordStyle(styles.createUserInput);
        }

        if (!passwordCheck) {
            setErrorMessageConfirm("Password confirmation is required.");
            setPasswordCheckStyle(styles.createUserInputError);
            emptyFields++;
            errorCount++;
        } else if (password !== passwordCheck) {
            setErrorMessageConfirm("Passwords must match.");
            setPasswordCheckStyle(styles.createUserInputError);
            errorCount++;
        } else {
            setErrorMessageConfirm("");
            setPasswordCheckStyle(styles.createUserInput);
        }

        if (emptyFields > 2) {
            setErrorMessage("Please fill out all fields.");
            setErrorMessageConfirm("");
            setErrorMessageEmail("");
            setErrorMessageFirst("");
            setErrorMessageLast("");
            setErrorMessagePassword("");
            setErrorMessageUsername("");
        } else {
            setErrorMessage("");
        }

        if (errorCount === 0) {
            userRegistration();
            createUser(firstName, lastName, username, email);
            router.push("LoginScreen");
        }
        // Set the errors and update form validity
        // setErrors(errors);
    };

    const auth = getAuth();

    // Creates a new user account
    const userRegistration = async () => {
        // Checks to make sure passwords match when creating an account
        if (password !== passwordCheck) {
            alert("Passwords don't match.");
            return;
        }

        if (email && password) {
            try {
                // Creates user into Firebase
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (error) {
                console.log("Got error: ", error.message);
            }
        }
    };

    // Called when 'registration' button is pressed to create the user into
    // Firebase auth, write the data to Realtime db, and direct user to login

    return (
        <SafeAreaProvider style={styles.background}>
            <View>
                <Text style={styles.registerHeader}> Register </Text>
            </View>
            <View style={styles.dividerLine} />
            {errorMessage && (
                <Text
                    style={{
                        color: "red",
                        paddingBottom: 10,
                        marginTop: -15,
                    }}>
                    {errorMessage}
                </Text>
            )}
            <KeyboardAvoidingView
                style={{
                    flex: 0.8,
                    width: "100%",
                    // marginBottom: 0,
                    //paddingBottom: 0,
                    justifyContent: "center",
                    width: "100%",
                    alignItems: "center",
                }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView
                    style={{
                        KeyboardAvoidingView: "position",
                        flex: 1,

                        width: "100%",
                        // marginBottom: 0,
                        //paddingBottom: 0,
                    }}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "center",
                        width: "100%",
                        alignItems: "center",
                    }}>
                    <View style={styles.forms}>
                        <TextInput
                            style={firstNameStyle}
                            placeholder="First Name"
                            value={firstName}
                            onChangeText={(value) => setFirstName(value)}
                        />
                        {errorMessageFirst && (
                            <Text
                                style={{
                                    color: "red",
                                    paddingBottom: 10,
                                    marginTop: -15,
                                }}>
                                {errorMessageFirst}
                            </Text>
                        )}
                        <TextInput
                            style={lastNameStyle}
                            placeholder="Last Name"
                            value={lastName}
                            onChangeText={(value) => setLastName(value)}
                        />
                        {errorMessageLast && (
                            <Text style={{ color: "red", paddingBottom: 10 }}>
                                {errorMessageLast}
                            </Text>
                        )}
                        <TextInput
                            style={usernameStyle}
                            placeholder="Username"
                            value={username}
                            onChangeText={(value) => setUsername(value)}
                        />
                        {errorMessageUsername && (
                            <Text style={{ color: "red", paddingBottom: 10 }}>
                                {errorMessageUsername}
                            </Text>
                        )}
                        <TextInput
                            style={emailStyle}
                            placeholder="Email"
                            value={email}
                            onChangeText={(value) => setEmail(value)}
                        />
                        {errorMessageEmail && (
                            <Text style={{ color: "red", paddingBottom: 10 }}>
                                {errorMessageEmail}
                            </Text>
                        )}
                        <TextInput
                            style={passwordStyle}
                            secureTextEntry={true}
                            placeholder="Password"
                            value={password}
                            onChangeText={(value) => setPassword(value)}
                        />
                        {errorMessagePassword && (
                            <Text style={{ color: "red", paddingBottom: 10 }}>
                                {errorMessagePassword}
                            </Text>
                        )}
                        <TextInput
                            style={passwordCheckStyle}
                            secureTextEntry={true}
                            placeholder={"Confirm Password"}
                            value={passwordCheck}
                            onChangeText={(value) => setPasswordCheck(value)}
                        />
                        {errorMessageConfirm && (
                            <Text style={{ color: "red", paddingBottom: 0 }}>
                                {errorMessageConfirm}
                            </Text>
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <TouchableOpacity
                style={{
                    width: "80%",
                    borderRadius: 25,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 40,
                    backgroundColor: "#3F72AF",
                }}
                onPress={handleValidation}>
                <Text style={styles.buttonText}>Create an Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => router.back()}
                style={[styles.accountButtons, {}]}>
                <Text>Already have an account?</Text>
                <Text>Login</Text>
            </TouchableOpacity>
        </SafeAreaProvider>
    );
};
