import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import styles from "../(aux)/StyleSheet";
import { router } from "expo-router";
import BackButtonComponent from "../../assets/svg/back_button.js";

export default function About() {
    return (
        <SafeAreaView style={styles.background}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%", paddingHorizontal: "5%" }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <BackButtonComponent></BackButtonComponent>
                </TouchableOpacity>

                <View>
                    <Text style={styles.loginHeader}>About</Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => router.push("(home)/Home")}>
                <Text>Home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
