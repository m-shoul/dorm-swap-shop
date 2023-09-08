import { StyleSheet, Text, SafeAreaView, TextInput, View, Button, Alert, TouchableOpacity} from 'react-native';
import React from 'react';

function LoginScreen(props) {
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

            <Text onPress={()=>Alert.alert('Creating Account')}>Not a User? Create an Account</Text>    
       </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
    },
    view:{
        width: '80%',
    },
    textBox: {
        backgroundColor: '#fff',
        width: "100%",
        height: 30,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
    remember: {
        padding: 40,
    }
})

export default LoginScreen;