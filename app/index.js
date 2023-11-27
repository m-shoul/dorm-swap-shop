import {
    Text,
    TextInput,
    View,
    SafeAreaView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import React, { useState, useRef } from "react";
import styles from "./(aux)/StyleSheet";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { router } from 'expo-router';
<<<<<<< Updated upstream
import { getUserID } from "../backend/dbFunctions";
=======
import { Button } from '../components/Buttons';
>>>>>>> Stashed changes


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

    // Figure out what saves the userId when I go to the register screen
    // we can use this to sage the state of the user and automatically log in
    // so user doesnt have to log in every time.
    console.log(getUserID());

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.background} >
                <View style={{ paddingTop: "45%" }}>
                    <Text style={styles.loginHeader}> Login </Text>
                </View>

                <View style={styles.dividerLine} />

                <View style={styles.forms}>
                    <TextInput
                        style={emailStyle}
                        value={email}
                        onChangeText={(value) => setEmail(value)}
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
                        onChangeText={(value) => setPassword(value)}
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
                    <Text style={{ color: "#585858" }}>Remember Me</Text>
                    <Text
                        style={{ paddingLeft: 100, color: "#585858" }}
                        onPress={() =>
                            router.push("(user)/ResetPasswordScreen")
                        }>
                        Forgot Password
                    </Text>
                </View>
<<<<<<< Updated upstream
                
                <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
=======

                {/* <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
>>>>>>> Stashed changes
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity> */}
                <Button width="80%" height="7%" backgroundColor="#3F72AF" title="Login" alignItems="center"
                    justifyContent="center" marginTop="12%" borderRadius="25%" press={handleLogin} />

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
};