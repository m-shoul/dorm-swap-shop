import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from "react-native";
import styles from "../(aux)/StyleSheet";
import BackButtonComponent from "../../assets/svg/back_button.js";
import { router } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function PostReportedScreen() {

    return (
        <SafeAreaProvider style={styles.background}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackButtonComponent />
                </TouchableOpacity>
                <Text style={styles.loginHeader}>Report Listing</Text>
            </View>

            <Text style={{ fontWeight: "bold", marginTop: "40%", marginBottom: "40%" }}>Post reported. Thank you for your feedback.</Text>

            <TouchableOpacity style={styles.loginBtn}
                onPress={() => router.push("Home")}>
                <Text style={styles.buttonText}>Return to Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn}
                onPress={() => router.push("Chat")}>
                <Text style={styles.buttonText}>Return to Chat</Text>
            </TouchableOpacity>

        </SafeAreaProvider>
    );
};