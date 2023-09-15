import {Text, SafeAreaView, TextInput, View, TouchableOpacity} from 'react-native';
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
                <Text style={styles.header}> Login </Text>
            </View>

            <View style={styles.forms}>
                <TextInput style={styles.createUserInput} placeholder="Email or Username" />
                <TextInput style={styles.createUserInput} placeholder="Password" />
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


