import {Text, SafeAreaView, TextInput, View, TouchableOpacity, RowContainer} from 'react-native';
import React from 'react';
import styles from '../styleSheets/StyleSheet.js';
// import { readData } from '../../backend/dbFunctions';

// readData("dorm-swap-shop").then((data) => {
//     console.log(data)
// });

const LoginScreen = ({navigation}) => {
    return (
       <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.loginHeader}> Login </Text>  
            </View>
            <View style={{backgroundColor: "#B3B3B3", height: 1, width: '90%', marginBottom: 20}} />

            <View style={styles.forms}>
                <TextInput style={styles.createUserInput} placeholder="Email or Username" />
                <TextInput style={styles.createUserInput} placeholder="Password" />
            </View>

            <View style={{flexDirection: 'row', color:'red'}}>
                <Text style={{color:'#585858'}}>Remember Me</Text>
                <Text style={{paddingLeft: 100, color:'#585858'}} onPress={() => navigation.navigate("ResetPasswordScreen")}>Forgot Password</Text>
            </View>
                

            <TouchableOpacity style={styles.loginBtn}>
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


