import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StyleSheet,
} from "react-native";
import styles from "../styleSheets/StyleSheet.js";

const DeleteAccount = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>Delete Account</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}>
                <Text>Delete Account</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default DeleteAccount;
