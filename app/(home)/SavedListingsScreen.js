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
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function SavedListingsScreen() {
    return (
        <SafeAreaProvider style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>SavedListings</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("Home")}>
                <Text>Home</Text>
            </TouchableOpacity>
        </SafeAreaProvider>
    );
};
