import {
    Text,
    View,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard,
    Modal,
} from "react-native";
import { Checkbox } from "expo-checkbox";
import React from "react";
import styles from "../(aux)/StyleSheet.js";
import { useState, useEffect, useRef } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { writeUserData } from "../../backend/dbFunctions.js";
import { createUser } from "../../backend/api/user.js";
import { router } from "expo-router";
import { getUserID } from "../../backend/dbFunctions.js";
import { Button } from "../../components/Buttons.js";
import termsOfService from "../../assets/termsOfService.js";
import { set } from "firebase/database";

export default function CreateUserScreen() {
    //All of the states that are used to store the actual values of the text inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");

    const [modalVisible, setModalVisible] = useState(false);
    const [agreeTermsOfService, setAgreeTermsOfService] = useState("");

    // Email and password needed for auth
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    //All of the states that are used to store the styles
    const [agreeTermsOfServiceStyle, setAgreeTermsOfServiceStyle] =
        useState("");
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
    const [errorMessageTermsOfService, setErrorMessageTermsOfService] =
        useState("");
    const firstNameInputRef = useRef(null);
    const lastNameInputRef = useRef(null);
    const userNameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);

    const [isSelected, setSelection] = useState(false);

    let validate = 0;
    useEffect(() => {
        // console.log("Reached useEffect");
        // Trigger form validation when name, email, or password changes
        if (validate == 1) {
            validateForm();
        }
    }, [firstName, lastName, username, email, password, passwordCheck]);

    const handleValidation = () => {
        // console.log("Reached handleValidation");
        validateForm();
        validate = 1;
    };

    const validateForm = async () => {
        let errorCount = 0;
        let emptyFields = 0;
        // console.log("Reached validateForm");
        // console.log(validate);
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
        } else if (/[^\p{L}\p{N}\p{P}\p{Z}]/gu.test(email)) {
            setErrorMessageEmail("Email should not contain emojis.");
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

        if (!agreeTermsOfService) {
            setErrorMessageTermsOfService(
                "You must agree to the Terms of Service."
            );

            errorCount++;
        } else {
            setErrorMessageTermsOfService("");
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
            const userId = await userRegistration();
            createUser(firstName, lastName, username, email, userId);
            router.push("/");
        }
        // Set the errors and update form validity
        // setErrors(errors);
    };

    // const auth = initializeAuth();
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
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const userId = userCredential.user.uid;
                // Do something with the user ID
                return userId;
            } catch (error) {
                console.log("Got error: ", error.message);
            }
        }
    };

    // Called when 'registration' button is pressed to create the user into
    // Firebase auth, write the data to Realtime db, and direct user to login

    return (
        <SafeAreaView style={styles.background}>
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
                            onSubmitEditing={() => {
                                lastNameInputRef.current.focus();
                            }}
                            maxLength={50}
                            ref={firstNameInputRef}
                            blurOnSubmit={false}
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
                            onSubmitEditing={() => {
                                userNameInputRef.current.focus();
                            }}
                            maxLength={50}
                            ref={lastNameInputRef}
                            blurOnSubmit={false}
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
                            onSubmitEditing={() => {
                                emailInputRef.current.focus();
                            }}
                            maxLength={50}
                            ref={userNameInputRef}
                            blurOnSubmit={false}
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
                            onSubmitEditing={() => {
                                passwordInputRef.current.focus();
                            }}
                            maxLength={254}
                            ref={emailInputRef}
                            blurOnSubmit={false}
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
                            onSubmitEditing={() => {
                                confirmPasswordInputRef.current.focus();
                            }}
                            maxLength={254}
                            ref={passwordInputRef}
                            blurOnSubmit={false}
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
                            onSubmitEditing={() => {
                                Keyboard.dismiss();
                            }}
                            maxLength={254}
                            ref={confirmPasswordInputRef}
                            blurOnSubmit={false}
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
            {errorMessageTermsOfService && (
                <Text style={{ color: "red", paddingBottom: 0 }}>
                    {errorMessageTermsOfService}
                </Text>
            )}
            <TouchableOpacity
                onPress={() => {
                    setModalVisible(true);
                }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ marginRight: "5%" }}>Terms of Service</Text>
                    <Checkbox
                        value={isSelected}
                        onValueChange={setSelection}
                        disabled={true}
                    />
                </View>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <Text
                            style={{
                                margin: "10%",
                                marginTop: "20%",
                            }}>
                            {termsOfService}
                        </Text>
                    </ScrollView>
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            top: "8%",
                            right: "5%",
                            padding: 10,
                            backgroundColor: "lightgray",
                            borderRadius: 5,
                        }}
                        onPress={() => setModalVisible(false)}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.loginBtn,
                            {
                                marginBottom: "10%",
                                marginRight: "20%",
                                marginLeft: "10%",
                                marginTop: "5%",
                            },
                        ]}
                        onPress={() => {
                            setModalVisible(false);
                            setAgreeTermsOfService(true);
                            setSelection(true);
                        }}>
                        <Text style={styles.buttonText}>I agree</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {/* <TouchableOpacity
                style={{
                    width: "80%",
                    borderRadius: 25,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "3%",
                    backgroundColor: "#3F72AF",
                }}
                onPress={handleValidation}>
                <Text style={styles.buttonText}>Create an Account</Text>
            </TouchableOpacity> */}
            <Button
                width="80%"
                height="7%"
                backgroundColor="#3F72AF"
                title="Create an Account"
                alignItems="center"
                justifyContent="center"
                marginTop="5%"
                borderRadius="25%"
                press={handleValidation}
                titleStyle={styles.buttonText}
            />

            <TouchableOpacity
                onPress={() => router.push("/")}
                style={[styles.accountButtons, {}]}>
                <Text
                    style={[
                        styles.notUserButtonText,
                        {
                            paddingBottom: "5%",
                            textAlign: "center",
                            marginTop: "10%",
                        },
                    ]}>
                    Already have an account?
                </Text>
                <Text
                    style={[
                        styles.notUserButtonText,
                        { textAlign: "center", marginBottom: "-20%" },
                    ]}>
                    Login
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
