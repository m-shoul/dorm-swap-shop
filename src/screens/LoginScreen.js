import { Text, SafeAreaView, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from '../styleSheets/StyleSheet.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from "firebase/auth";


const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessage2, setErrorMessage2] = useState('');
    const [emailStyle, setEmailStyle] = useState(styles.createUserInput);
    const [passwordStyle, setPasswordStyle] = useState(styles.createUserInput);

    const auth = getAuth();

    const handleLogin = async () => {
        //Check that user fills out form
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
        } else if (email && password) {
            try {
                // Signs user into Firebase
                await signInWithEmailAndPassword(auth, email, password);
                navigation.navigate("HomeScreen");
                setErrorMessage('');
                setErrorMessage2('');
                setEmailStyle(styles.createUserInput)
                setPasswordStyle(styles.createUserInput)
            } catch (error) {
                setErrorMessage('Invalid Email or Password');
                setErrorMessage2('Invalid Email or Password');
                setEmailStyle(styles.createUserInputError)
                setPasswordStyle(styles.createUserInputError)
            }
        }
    }

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
                    placeholder="Email"
                />

                {errorMessage && <Text style={{ color: 'red', paddingBottom: 20 }}>{errorMessage}</Text>}

                <TextInput
                    style={passwordStyle}
                    secureTextEntry={true}
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
                <Text style={styles.loginText} >Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('CreateUserScreen')} style={styles.accountButtons} >
                <Text>Not a User? </Text>
                <Text>Create an Account</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default LoginScreen;

