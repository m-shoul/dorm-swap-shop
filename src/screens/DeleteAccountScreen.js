import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import styles from "../styleSheets/StyleSheet.js";
import BackButtonComponent from "../assets/svg/back_button.js";

const DeleteAccount = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.background}>
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
                onPress={() => navigation.navigate("Profile")} style={styles.deleteBtn}>
                <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
        </SafeAreaView >
    );
};

export default DeleteAccount;
