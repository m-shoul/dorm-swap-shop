import {Text, SafeAreaView, TextInput, View, Button, Alert, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../styleSheets/StyleSheet.js';


const LoginScreen = ({navigation}) => {
    return (
       <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.header}> Login </Text>
            </View>
            <View style={styles.forms}>
                <TextInput style={styles.createUserInput} placeholder="Email or Username" />
                <TextInput style={styles.createUserInput} placeholder="Password" />
                <Text><Text>Remember me</Text>
                <Text>Forgot Password</Text> </Text>
            </View>
                

            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN</Text> 
            </TouchableOpacity>

            <Text onPress={()=>navigation.navigate('CreateUserScreen')}>Not a User? Create an Account</Text>    
       </SafeAreaView>
    );
}

export default LoginScreen;