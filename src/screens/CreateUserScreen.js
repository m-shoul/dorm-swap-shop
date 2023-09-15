import {Text,View,TextInput,SafeAreaView,TouchableOpacity} from "react-native";
import React from "react";
import styles from '../styleSheets/StyleSheet.js';

const CreateUserScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.registerHeader}> Register </Text>
            </View>
            <View style={styles.forms}>
                <TextInput style={styles.createUserInput} placeholder="First Name" />
                <TextInput style={styles.createUserInput} placeholder="Last Name" />
                <TextInput style={styles.createUserInput} placeholder="Username" />
                <TextInput style={styles.createUserInput} placeholder="Email" />
                <TextInput
                    style={styles.createUserInput}
                    secureTextEntry={true}
                    placeholder="Password"
                />
                <TextInput
                    style={styles.createUserInput}
                    secureTextEntry={true}
                    placeholder="Confirm Password"
                />
            </View>

            <TouchableOpacity style={styles.loginBtn}>
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
