import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from "react-native";
import styles from "../styleSheets/StyleSheet.js";

const SettingsScreen = ({ navigation }) => {
   
    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>Settings</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}>
                <Text>Home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default SettingsScreen;
