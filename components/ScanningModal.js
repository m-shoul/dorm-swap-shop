import { View, Text, ActivityIndicator } from "react-native";
import styles from "../app/(aux)/StyleSheet";

export default function ScanningModal({ loading }) {
    return (
        loading && (
            <View style={styles.scanningModalContainer}>
                <ActivityIndicator size="large" color={styles.colors.darkAccentColor} />
                <Text style={styles.boldText}>Hang tight... checking images for inappropriate content...</Text>
            </View>
        )
    );
};