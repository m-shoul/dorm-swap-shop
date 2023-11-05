import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from "react-native";
import styles from "../(aux)/StyleSheet";
import BackButtonComponent from "../../assets/svg/back_button.js";

const PostReportedScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.background}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackButtonComponent />
                </TouchableOpacity>
                <Text style={styles.loginHeader}>Report Listing</Text>
            </View>

            <Text style={{ fontWeight: "bold", marginTop: "40%", marginBottom: "40%" }}>Post reported. Thank you for your feedback.</Text>

            <TouchableOpacity style={styles.loginBtn}
                onPress={() => navigation.navigate("Home")}>
                <Text style={styles.buttonText}>Return to Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn}
                onPress={() => navigation.navigate("Chat")}>
                <Text style={styles.buttonText}>Return to Chat</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

export default PostReportedScreen;