import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../(aux)/StyleSheet.js";
import { router } from "expo-router";
import { deleteUser } from "../../backend/api/user.js";
import RoundHeader from "../../components/RoundHeader.js";
import { Ionicons } from '@expo/vector-icons';

console.log("******************** On delete screen *******************");

export default function DeleteAccount() {
    return (
        <SafeAreaView style={styles.background}>
            <RoundHeader height={230} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={32} color="white" />
                </TouchableOpacity>

                <View>
                    <Text style={[styles.loginHeader, { color: styles.colors.lightColor }]}>Delete Account</Text>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "80%" }}>

                <Text style={{ fontWeight: "bold", fontSize: 25, marginBottom: "10%", textAlign: "center" }}>
                    Are you sure you want to{'\n'}delete your account?
                </Text>
                <Text style={{ fontWeight: "normal", fontSize: 18, marginBottom: "10%", textAlign: "center" }}>
                    Deleting your account will delete all data associated
                    with your account including but not limited to name,
                    email, listings, and chats.
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 25 }}>This action is irreversible</Text>
            </View>

            <TouchableOpacity
                onPress={() => {
                    deleteUser();
                    router.push("/");
                    alert("Account Deleted");
                }}
                style={styles.deleteBtn}>
                <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
        </SafeAreaView >
    );
};
