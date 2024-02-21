import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useRef } from "react";
import styles from "./(aux)/StyleSheet";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { router } from "expo-router";
import { getUserID } from "../backend/dbFunctions";
import { Button } from "../components/Buttons";
import LogoV2 from "../assets/svg/logoV2";
import { RegExpMatcher, TextCensor, englishDataset, englishRecommendedTransformers, asteriskCensorStrategy } from "obscenity";


export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage2, setErrorMessage2] = useState("");
    const [emailStyle, setEmailStyle] = useState(styles.createUserInput);
    const [passwordStyle, setPasswordStyle] = useState(styles.createUserInput);
    const passwordInputRef = useRef(null);
    const auth = getAuth();

    const handleLogin = async () => {
        //Check that user fills out form
        if (!email && !password) {
            setErrorMessage("Form Empty");
            setErrorMessage2("Form Empty");
            setEmailStyle(styles.createUserInputError);
            setPasswordStyle(styles.createUserInputError);
        } else if (!email) {
            setErrorMessage("Email Empty");
            setErrorMessage2("");
            setEmailStyle(styles.createUserInputError);
            setPasswordStyle(styles.createUserInput);
        } else if (!password) {
            setErrorMessage2("Password Empty");
            setErrorMessage("");
            setPasswordStyle(styles.createUserInputError);
            setEmailStyle(styles.createUserInput);
        } else if (email && password) {
            try {
                // Signs user into Firebase
                await signInWithEmailAndPassword(auth, email, password);
                router.push("(home)/Home");
                setErrorMessage("");
                setErrorMessage2("");
                setEmailStyle(styles.createUserInput);
                setPasswordStyle(styles.createUserInput);
            } catch (error) {
                setErrorMessage("Invalid Email or Password");
                setErrorMessage2("Invalid Email or Password");
                setEmailStyle(styles.createUserInputError);
                setPasswordStyle(styles.createUserInputError);
            }
        }
    };

    // Obscenity - filtering out inappropriate text
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
            case "password":
                setPassword(filteredValue);
                break;
            default:
                break;
        }
    };

    // Figure out what saves the userId when I go to the register screen
    // we can use this to sage the state of the user and automatically log in
    // so user doesnt have to log in every time.
    console.log("*** IN APP - Login Screen " + getUserID());

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.background}>
                <LogoV2 />

                <View style={styles.dividerLine} />

                <View style={styles.forms}>
                    <TextInput
                        style={emailStyle}
                        value={email}
                        onChangeText={(value) => {
                            if (value.trim().length > 0) {
                                filterOutBadWords("email", value);
                            } else {
                                setEmail("");
                            }
                        }}
                        placeholder="Email"
                        onSubmitEditing={() => {
                            // Focus on the password input when the user submits the email input
                            passwordInputRef.current.focus();
                        }}
                        blurOnSubmit={false}
                    />

                    {errorMessage && (
                        <Text style={{ color: "red", paddingBottom: 20 }}>
                            {errorMessage}
                        </Text>
                    )}

                    <TextInput
                        style={passwordStyle}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(value) => {
                            if (value.trim().length > 0) {
                                filterOutBadWords("password", value);
                            } else {
                                setPassword("");
                            }
                        }}
                        placeholder="Password"
                        ref={passwordInputRef}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                    />

                    {errorMessage2 && (
                        <Text style={{ color: "red", paddingBottom: 20 }}>
                            {errorMessage2}
                        </Text>
                    )}
                </View>

                <View style={{ flexDirection: "row", color: "red" }}>
                    <Text></Text>
                    <Text
                        style={{ color: "#585858" }}
                        onPress={() =>
                            router.push("(user)/ResetPasswordScreen")
                        }>
                        Forgot Password
                    </Text>
                </View>

                {/* <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity> */}
                <Button
                    width="80%"
                    backgroundColor={styles.colors.darkAccentColor}
                    title="Login"
                    alignItems="center"
                    justifyContent="center"
                    marginTop="6%"
                    marginBottom="6%"
                    borderRadius={25}
                    press={handleLogin}
                    titleStyle={styles.buttonText}
                />

                <TouchableOpacity
                    onPress={() => router.push("(user)/CreateUserScreen")}
                    style={styles.notUserButton}>
                    <Text style={styles.notUserButtonText}>Not a User? </Text>
                    <Text style={styles.notUserButtonText}>
                        Create an Account
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
