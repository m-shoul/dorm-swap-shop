import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from "react-native";
import styles from "../(aux)/StyleSheet";
import BackButtonComponent from "../../assets/svg/back_button.js";
import { router } from "expo-router";
import { Button } from '../../components/Buttons.js';


export default function PostReportedScreen() {

    return (
        <SafeAreaView style={styles.background}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <BackButtonComponent />
                </TouchableOpacity>
                <Text style={styles.loginHeader}>Report Listing</Text>
            </View>

            <Text style={{ fontWeight: "bold", marginTop: "40%", marginBottom: "40%" }}>Post reported. Thank you for your feedback.</Text>


            <Button backgroundColor="#3F72AF" title="Return to Home" alignItems="center"
                justifyContent="center" borderRadius="25%" width="80%"
                height="7%" marginTop="12%" href="Home" titleStyle={styles.buttonText}
            />

            <Button backgroundColor="#3F72AF" title="Return to Chat" alignItems="center"
                justifyContent="center" borderRadius="25%" width="80%"
                height="7%" marginTop="12%" href="Chat" titleStyle={styles.buttonText}
            />

        </SafeAreaView>
    );
};