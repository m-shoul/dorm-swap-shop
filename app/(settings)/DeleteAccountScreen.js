import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import styles from "../(aux)/StyleSheet.js";
import BackButtonComponent from "../../assets/svg/back_button.js";
import { router } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function DeleteAccount() {
    return (
        <SafeAreaProvider style={styles.background}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackButtonComponent></BackButtonComponent>
                </TouchableOpacity>

                <View>
                    <Text style={styles.loginHeader}>Delete Account</Text>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "80%" }}>

                <Text style={{ fontWeight: "bold", fontSize: 25, marginBottom: "10%", textAlign: "center" }}>
                    Are you sure you want to{'\n'}delete your account?</Text>
                <Text style={{ fontWeight: "bold", fontSize: 25 }}>This action is irreversible</Text>
            </View>

            <TouchableOpacity
                onPress={() => router.push("Profile")} style={styles.deleteBtn}>
                <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
        </SafeAreaProvider >
    );
};
