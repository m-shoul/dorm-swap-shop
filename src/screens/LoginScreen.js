import { StyleSheet, Text, SafeAreaView, TextInput, View, Button, Alert, TouchableOpacity} from 'react-native';
import * as React from 'react';

const LoginScreen = ({navigation}) => {
    return (
       <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <Text>User Name or Email:</Text>
                <TextInput style={styles.textBox} placeholder='Username or Email'/>
                <Text>Password:</Text>
                <TextInput style={styles.textBox} placeholder='Password'/>
            </View>
            <View>
                <Text><Text>Remember me</Text>
                <Text>Forgot Password</Text> </Text>
            </View>

            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN</Text> 
            </TouchableOpacity>

            <Text onPress={() => navigation.navigate('CreateUserScreen')}>Not a User? Create an Account</Text>   
       </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue'
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