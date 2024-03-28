import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard,
    Modal,
    StatusBar,
    TouchableWithoutFeedback,
    Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Checkbox } from "expo-checkbox";
import React from "react";
import styles from "../(aux)/StyleSheet.js";
import { useState, useEffect, useRef } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { createUser } from "../../backend/api/user.js";
import { router } from "expo-router";
import { Button } from "../../components/Buttons.js";
import termsOfService from "../../assets/termsOfService.js";
import RoundHeader from "../../components/RoundHeader.js";
import SimpleLogo from "../../assets/svg/simpleLogo_icon.js";
import { ShadowedView } from "react-native-fast-shadow";
import {
    RegExpMatcher,
    TextCensor,
    englishDataset,
    englishRecommendedTransformers,
    asteriskCensorStrategy,
} from "obscenity";

export default function CreateUserScreen() {
    //All of the states that are used to store the actual values of the text inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [agreeTermsOfService, setAgreeTermsOfService] = useState("");

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
    const [errorMessageTermsOfService, setErrorMessageTermsOfService] = useState("");
    const firstNameInputRef = useRef(null);
    const lastNameInputRef = useRef(null);
    const userNameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);

    const [isSelected, setSelection] = useState(false);

    const { width } = Dimensions.get("window");
    normalText = width / 20;
    let validate = 0;
    
    useEffect(() => {
        if (validate == 1) {
            validateForm();
        }
    }, [firstName, lastName, username, email, password, passwordCheck]);

    const handleValidation = () => {
        validateForm();
        validate = 1;
    };

    const validateForm = async () => {
        let errorCount = 0;
        let emptyFields = 0;
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
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const userId = userCredential.user.uid;
                // Do something with the user ID
                return userId;
            } catch (error) {
                console.error(
                    "ERROR --> Failed to register user account: ",
                    error.message
                );
            }
        }
    };
    const insets = useSafeAreaInsets();

    const matcher = new RegExpMatcher({
        ...englishDataset.build(),
        ...englishRecommendedTransformers,
    });
    const censor = new TextCensor().setStrategy(asteriskCensorStrategy());
    const filterOutBadWords = (fieldName, value) => {
        const matches = matcher.getAllMatches(value);
        const filteredValue = censor.applyTo(value, matches);
        switch (fieldName) {
            case "fname":
                setFirstName(filteredValue);
                break;
            case "lname":
                setLastName(filteredValue);
                break;
            case "username":
                setUsername(filteredValue);
                break;
            case "email":
                setEmail(filteredValue);
                break;
            default:
                break;
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[styles.background, { paddingTop: insets.top }]}>
                <StatusBar barStyle={"light-content"} />
                <RoundHeader height={150} />

                <ShadowedView
                    style={{
                        shadowOpacity: 0.8,
                        shadowRadius: 20,
                        shadowOffset: {
                            width: 5,
                            height: 3,
                        },
                        backgroundColor: "white",
                        marginTop: "10%",
                        borderRadius: 20,
                    }}>
                    <SimpleLogo width={119} height={119} margin={-2.1} />
                </ShadowedView>

                <Text style={styles.registerHeader}> Register </Text>

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
                        width: "100%",
                    }}
                    behavior={Platform.OS === "ios" ? "height" : "height"}>
                    <ScrollView
                        style={{
                            KeyboardAvoidingView: "position",
                            width: "100%",
                        }}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{
                            alignItems: "center",
                        }}>
                        <View style={styles.forms}>
                            <TextInput
                                onSubmitEditing={() => {
                                    lastNameInputRef.current.focus();
                                }}
                                maxLength={15}
                                ref={firstNameInputRef}
                                blurOnSubmit={false}
                                style={firstNameStyle}
                                placeholder="First Name"
                                value={firstName}
                                onChangeText={(value) => {
                                    if (value.trim().length > 0) {
                                        filterOutBadWords("fname", value);
                                    } else {
                                        setFirstName("");
                                    }
                                }}
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
                                maxLength={15}
                                ref={lastNameInputRef}
                                blurOnSubmit={false}
                                style={lastNameStyle}
                                placeholder="Last Name"
                                value={lastName}
                                onChangeText={(value) => {
                                    if (value.trim().length > 0) {
                                        filterOutBadWords("lname", value);
                                    } else {
                                        setLastName("");
                                    }
                                }}
                            />
                            {errorMessageLast && (
                                <Text
                                    style={{
                                        color: "red",
                                        paddingBottom: 10,
                                        marginTop: -15,
                                    }}>
                                    {errorMessageLast}
                                </Text>
                            )}
                            <TextInput
                                onSubmitEditing={() => {
                                    emailInputRef.current.focus();
                                }}
                                maxLength={25}
                                ref={userNameInputRef}
                                blurOnSubmit={false}
                                style={usernameStyle}
                                placeholder="Username"
                                value={username}
                                onChangeText={(value) => {
                                    if (value.trim().length > 0) {
                                        filterOutBadWords("username", value);
                                    } else {
                                        setUsername("");
                                    }
                                }}
                            />
                            {errorMessageUsername && (
                                <Text
                                    style={{
                                        color: "red",
                                        paddingBottom: 10,
                                        marginTop: -15,
                                    }}>
                                    {errorMessageUsername}
                                </Text>
                            )}
                            <TextInput
                                onSubmitEditing={() => {
                                    passwordInputRef.current.focus();
                                }}
                                maxLength={100}
                                ref={emailInputRef}
                                blurOnSubmit={false}
                                style={emailStyle}
                                placeholder="Email"
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
                                        paddingBottom: 10,
                                        marginTop: -15,
                                    }}>
                                    {errorMessageEmail}
                                </Text>
                            )}
                            <View
                                style={[
                                    passwordCheckStyle,
                                    { padding: 0, flexDirection: "row" },
                                ]}>
                                <TextInput
                                    onSubmitEditing={() => {
                                        confirmPasswordInputRef.current.focus();
                                    }}
                                    keyboardType={
                                        Platform.OS === "ios"
                                            ? "ascii-capable"
                                            : "visible-password"
                                    }
                                    style={{
                                        fontSize: normalText,
                                        flex: 1,
                                        marginRight: 30,
                                    }}
                                    maxLength={254}
                                    ref={passwordInputRef}
                                    blurOnSubmit={false}
                                    secureTextEntry={!isPasswordVisible}
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={(value) => setPassword(value)}
                                />
                                <TouchableOpacity
                                    hitSlop={{
                                        top: 10,
                                        bottom: 10,
                                        left: 10,
                                        right: 10,
                                    }}
                                    style={{
                                        position: "absolute",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 1,
                                        paddingBottom: 20,

                                        right: 10,
                                        top: 8,
                                    }}
                                    onPress={() =>
                                        setIsPasswordVisible(!isPasswordVisible)
                                    }>
                                    <View
                                        style={{
                                            justifyContent: "center",
                                            paddingTop: 1,
                                        }}>
                                        {isPasswordVisible ? (
                                            <Entypo
                                                name="eye"
                                                size={18}
                                                color="black"
                                            />
                                        ) : (
                                            <Entypo
                                                name="eye-with-line"
                                                size={18}
                                                color="black"
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {errorMessagePassword && (
                                <Text
                                    style={{
                                        color: "red",
                                        paddingBottom: 10,
                                        marginTop: -15,
                                    }}>
                                    {errorMessagePassword}
                                </Text>
                            )}
                            <View
                                style={[
                                    passwordCheckStyle,
                                    { padding: 0, flexDirection: "row" },
                                ]}>
                                <TextInput
                                    onSubmitEditing={() => {
                                        Keyboard.dismiss();
                                    }}
                                    keyboardType={
                                        Platform.OS === "ios"
                                            ? "ascii-capable"
                                            : "visible-password"
                                    }
                                    maxLength={254}
                                    ref={confirmPasswordInputRef}
                                    blurOnSubmit={false}
                                    style={{
                                        fontSize: normalText,
                                        flex: 1,
                                        marginRight: 30,
                                    }}
                                    secureTextEntry={!isConfirmPasswordVisible}
                                    placeholder={"Confirm Password"}
                                    value={passwordCheck}
                                    onChangeText={(value) =>
                                        setPasswordCheck(value)
                                    }
                                />
                                <TouchableOpacity
                                    hitSlop={{
                                        top: 10,
                                        bottom: 10,
                                        left: 10,
                                        right: 10,
                                    }}
                                    style={{
                                        position: "absolute",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 1,
                                        paddingBottom: 20,

                                        right: 10,
                                        top: 8,
                                    }}
                                    onPress={() =>
                                        setIsConfirmPasswordVisible(
                                            !isConfirmPasswordVisible
                                        )
                                    }>
                                    <View
                                        style={{
                                            justifyContent: "center",
                                            paddingTop: 1,
                                        }}>
                                        {isConfirmPasswordVisible ? (
                                            <Entypo
                                                name="eye"
                                                size={18}
                                                color="black"
                                            />
                                        ) : (
                                            <Entypo
                                                name="eye-with-line"
                                                size={18}
                                                color="black"
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {errorMessageConfirm && (
                                <Text
                                    style={{
                                        color: "red",
                                        paddingBottom: 10,
                                        marginTop: -15,
                                    }}>
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
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ marginRight: "5%" }}>
                            Terms of Service
                        </Text>
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
                        <Button
                            width="80%"
                            borderRadius={25}
                            alignItems="center"
                            justifyContent="center"
                            marginTop="5%"
                            marginBottom="10%"
                            marginRight="20%"
                            marginLeft="10%"
                            backgroundColor="#3F72AF"
                            press={() => {
                                setModalVisible(false);
                                setAgreeTermsOfService(true);
                                setSelection(true);
                            }}
                            title="I agree"
                            titleStyle={styles.buttonText}
                        />
                    </View>
                </Modal>
                <Button
                    width="80%"
                    backgroundColor={styles.colors.darkAccentColor}
                    title="Create an Account"
                    alignItems="center"
                    justifyContent="center"
                    marginTop="5%"
                    borderRadius={25}
                    press={handleValidation}
                    titleStyle={styles.buttonText}
                    marginBottom={10}
                />

                <TouchableOpacity onPress={() => router.push("/")}>
                    <Text
                        style={[
                            styles.notUserButtonText,
                            { textAlign: "center" },
                        ]}>
                        Already have an account?
                    </Text>
                    <Text
                        style={[
                            styles.notUserButtonText,
                            { textAlign: "center" },
                        ]}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}
