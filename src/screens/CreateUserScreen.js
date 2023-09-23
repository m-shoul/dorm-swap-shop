import { Text, View, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import styles from '../styleSheets/StyleSheet.js';
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { writeUserData } from '../../backend/dbFunctions.js'

const CreateUserScreen = ({ navigation }) => {
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [username, setUsername] = useState('')

    // Email and password needed for auth
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('')

    const auth = getAuth();

    // Creates a new user account
    const userRegistration = async () => {
        // Checks to make sure passwords match when creating an account
        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }

        if (email && password) {
            try {
                // Creates user into Firebase
                await createUserWithEmailAndPassword(auth, email, password);
            } catch(error) {
                console.log('Got error: ', error.message);
            }
        }
    }

    // Called when 'registration' button is pressed to create the user into
    // Firebase auth, write the data to Realtime db, and direct user to login
    const handlePress = () => {
        userRegistration();
        writeUserData(fname, lname, username, email, password);
        navigation.navigate("LoginScreen");
    }

    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.registerHeader}> Register </Text>
            </View>
            <View style={styles.forms}>
                <TextInput
                    style={styles.createUserInput}
                    placeholder="First Name"
                    value={fname}
                    onChangeText={(value) => setFName(value)}
                />
                <TextInput style={styles.createUserInput}
                    placeholder="Last Name"
                    value={lname}
                    onChangeText={(value) => setLName(value)}
                />
                <TextInput style={styles.createUserInput}
                    placeholder="Username"
                    value={username}
                    onChangeText={(value) => setUsername(value)}
                />
                <TextInput style={styles.createUserInput}
                    placeholder="Email"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />
                <TextInput
                    style={styles.createUserInput}
                    secureTextEntry={true}
                    placeholder="Password"
                    value={password}
                    onChangeText={value => setPassword(value)}
                />
                <TextInput
                    style={styles.createUserInput}
                    secureTextEntry={true}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={(value) => setConfirmPassword(value)}
                />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={handlePress}>
                <Text style={styles.loginText}>Create an Account</Text> 
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} style={styles.accountButtons}>
                <Text>Already have an account?</Text>
                <Text>Login</Text>
            </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateUserScreen;
