import { Text, SafeAreaView, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from '../styleSheets/StyleSheet.js';
import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from "firebase/auth";

import { auth } from '../../backend/config/firebaseConfig';
// import { readData } from '../../backend/dbFunctions';

// readData("dorm-swap-shop").then((data) => {
//     console.log(data)
// });

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessage2, setErrorMessage2] = useState('');
    const [emailStyle, setEmailStyle] = useState(styles.createUserInput);
    const [passwordStyle, setPasswordStyle] = useState(styles.createUserInput);
    const handleLogin = () => {

        if (!email && !password) {
            setErrorMessage('Form Empty');
            setErrorMessage2('Form Empty');
            setEmailStyle(styles.createUserInputError)
            setPasswordStyle(styles.createUserInputError)
        } else if (!email) {
            setErrorMessage('Email Empty');
            setErrorMessage2('');
            setEmailStyle(styles.createUserInputError)
            setPasswordStyle(styles.createUserInput)
        } else if (!password) {
            setErrorMessage2('Password Empty');
            setErrorMessage('');
            setPasswordStyle(styles.createUserInputError)
            setEmailStyle(styles.createUserInput)
        } else {
            { navigation.navigate('HomeScreen') }
        }

        // auth
        // .then(userCredentials => {
        //     const user = userCredentials.user;
        //     console.log('Logged in with:', user.email);
        // })
        // .catch(error => setErrorMessage('* Invalid Email'))
    }


    // const LoginScreen = ({navigation}) => {
    //     const [username, setUsername] = useState('')
    //     const [email, setEmail] = useState('');
    //     const [password, setPassword] = useState('');
    //     const [errorMessage, setErrorMessage] = useState('');

    //     const auth = getAuth();

    //     // Logs the user in
    //     const userLogin = async () => {
    //         if (email && password) {
    //             try {
    //                 // Signs user into Firebase
    //                 await signInWithEmailAndPassword(auth, email, password);
    //                 navigation.navigate("HomeScreen");
    //             } catch(error) {
    //                 console.log('Got error: ', error.message);
    //             }
    //         } else {
    //             alert("Please enter TEXT");
    //         }
    //     }

    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.loginHeader}> Login </Text>
            </View>
            <View style={{ backgroundColor: "#B3B3B3", height: 1, width: '90%', marginBottom: 20 }} />

            <View style={styles.forms}>
                <TextInput
                    style={emailStyle}
                    value={email}
                    onChangeText={value => setEmail(value)}
                    placeholder="Email or Username"
                />
                {errorMessage && <Text style={{ color: 'red', paddingBottom: 20 }}>{errorMessage}</Text>}
                <TextInput
                    style={passwordStyle}
                    value={password}
                    onChangeText={value => setPassword(value)}
                    placeholder="Password"
                />
                {errorMessage2 && <Text style={{ color: 'red', paddingBottom: 20 }}>{errorMessage2}</Text>}
            </View>

            <View style={{ flexDirection: 'row', color: 'red' }}>
                <Text style={{ color: '#585858' }}>Remember Me</Text>
                <Text style={{ paddingLeft: 100, color: '#585858' }} onPress={() => navigation.navigate("ResetPasswordScreen")}>Forgot Password</Text>
            </View>


            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginText} >LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('CreateUserScreen')} style={styles.accountButtons} >
                <Text>Not a User? </Text>
                <Text>Create an Account</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default LoginScreen;

