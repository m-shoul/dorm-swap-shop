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

export default function SavedListingsScreen() {
    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>SavedListings</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("Home")}>
                <Text>Home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
