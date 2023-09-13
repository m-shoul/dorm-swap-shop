import { StyleSheet, Text, SafeAreaView, TextInput, View, Button, Alert, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../styleSheets/StyleSheet.js';

const LoginScreen = ({navigation}) => {
    return (
       <SafeAreaView style={styles.background}>
            <View style={styles.view}>
                <Text>User Name:</Text>
                <TextInput style={styles.textBox}/>
                <Text>Password:</Text>
                <TextInput style={styles.textBox}/>
            </View>
            <View>
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