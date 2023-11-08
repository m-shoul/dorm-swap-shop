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

export default function EditListings() {
    return (
        <SafeAreaProvider style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>EditListings</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("HomeScreen")}>
                <Text>Home</Text>
            </TouchableOpacity>
        </SafeAreaProvider>
    );
};
