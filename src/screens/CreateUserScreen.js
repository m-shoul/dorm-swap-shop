import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Pressable,
    onPress,
    title,
    SafeAreaView,
} from "react-native";
import React from "react";

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    createUserInput: {
        marginTop: 20,
        textAlign: "center",
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderRadius: 10,

        fontWeight: "bold",
        fontSize: 20,
        padding: 7,
    },

    header: {
        margin: 20,
        fontWeight: "bold",
        fontSize: 30,
        alignContent: "center",
        textAlign: "center",
    },
    button: {
        textAlign: "center",
    },
});

const CreateUserScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View>
                <Text style={styles.header}> Register </Text>
            </View>
            <View>
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

                <Button title="Create Account" />
                <Text
                    onPress={() => navigation.navigate("LoginScreen")}
                    style={styles.button}
                >
                    Already have an account? Login
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default CreateUserScreen;
