import {Text, SafeAreaView, TextInput, View, TouchableOpacity, RowContainer} from 'react-native';
import React from 'react';
import styles from '../styleSheets/StyleSheet.js';
import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from "firebase/auth";

// import { readData } from '../../backend/dbFunctions';

// readData("dorm-swap-shop").then((data) => {
//     console.log(data)
// });

const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    const auth = getAuth();

    // TODO: Implement this to check if the passwords match or not.
    // Just trying to get the initial login and navigation working...
    // const onRegisterPress = () => {
    //     if (password !== confirmPassword) {
    //         alert("Passwords don't match.")
    //         return
    //     }
    // }

    // Logs the user in
    const handleSubmit = async () => {
        if (email && password) {
            try {
                // Creates user into Firebase
                await signInWithEmailAndPassword(auth, email, password);
            } catch(error) {
                console.log('Got error: ', error.message);
            }
        }
    }

    return (
       <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.loginHeader}> Login </Text>  
            </View>
            <View style={{backgroundColor: "#B3B3B3", height: 1, width: '90%', marginBottom: 20}} />

            <View style={styles.forms}>
                <TextInput style={styles.createUserInput} 
                    placeholder="Email or Username" 
                    value={username}
                    onChangeText={(value) => setUsername(value)}
                    // TODO: Will also have to figure out how to do email OR username...
                />
                <TextInput style={styles.createUserInput}
                    secureTextEntry={true}
                    placeholder="Password" 
                    value={password}
                    onChangeText={value => setPassword(value)}
                />
            </View>

            <View style={{flexDirection: 'row', color:'red'}}>
                <Text style={{color:'#585858'}}>Remember Me</Text>
                <Text style={{paddingLeft: 100, color:'#585858'}} onPress={() => 
                    navigation.navigate("ResetPasswordScreen")}>Forgot Password</Text>
            </View>
                

            <TouchableOpacity style={styles.loginBtn} onPress={() => {
                handleSubmit(); 
                navigation.navigate("HomeScreen")
                }}>
                <Text style={styles.loginText}>LOGIN</Text> 
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('CreateUserScreen')} style={styles.accountButtons} >
                <Text>Not a User? </Text>
                <Text>Create an Account</Text> 
            </TouchableOpacity>    
       </SafeAreaView>
    );
}

export default LoginScreen;


