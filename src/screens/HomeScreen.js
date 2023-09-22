import {Text,View,TextInput,SafeAreaView,TouchableOpacity} from "react-native";
import React from "react";
import styles from '../styleSheets/StyleSheet.js';
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";

const HomeScreen = ({ navigation }) => {

    const auth = getAuth();

    const handleLogout = async () => {
        await signOut(auth);
    }

    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.registerHeader}> Home </Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;