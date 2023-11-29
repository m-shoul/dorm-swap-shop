import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import styles from "../(aux)/StyleSheet.js";
import BackButtonComponent from "../../assets/svg/back_button.js";
import { router } from "expo-router";
import { Button } from '../../components/Buttons.js';


export default function DeleteAccount() {
    return (
        <SafeAreaView style={styles.background}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => router.back()}>
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

            {/* <TouchableOpacity
                onPress={() => router.push("/")} style={styles.deleteBtn}>
                <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity> */}
            <Button width="80%" height="7%" backgroundColor="#F30000" title="Delete Account" alignItems="center"
                justifyContent="center" marginTop="12%" borderRadius="25%" href="/" titleStyle={styles.buttonText} />
        </SafeAreaView >
    );
};
