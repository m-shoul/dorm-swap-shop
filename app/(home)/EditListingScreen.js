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

const EditListings = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>EditListings</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("HomeScreen")}>
                <Text>Home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default EditListings;
