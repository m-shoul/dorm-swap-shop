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
                    <Text style={styles.loginHeader}>About Us</Text>
                </View>
            </View>
            <View>
                <Text>Mission Statement: Committed to making school supplies and accessories cheaper and
                    accessible for all college students</Text>
            </View>

            <Text>Brand History: Dorm Swap and Shop was created to solve the problem of college </Text>
            <Text>What Makes us Different: </Text>
            <View>
                <Text>Meet the Team:</Text>
                <Text>Project Lead/Owner: Mike Shoul</Text>
                <Text>Developers: Joseph McGillen, Ben Clarke, Josh Phillips</Text>
            </View>
            <Text>Contact Us</Text>


            <TouchableOpacity><Text>Terms and Conditions</Text></TouchableOpacity>
        </SafeAreaView>
    );
};
