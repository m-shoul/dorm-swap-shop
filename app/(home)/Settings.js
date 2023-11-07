import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StyleSheet,
} from "react-native";
import styles from "../(aux)/StyleSheet";
import { router } from "expo-router";

const SettingsScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>Settings</Text>
            </View>
            <TouchableOpacity
                onPress={() => router.push("DeleteAccount")}>
                <Text>Delete Account</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default SettingsScreen;
