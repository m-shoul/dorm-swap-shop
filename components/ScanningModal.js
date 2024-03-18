import { View, Text, ActivityIndicator } from "react-native";
import styles from "../app/(aux)/StyleSheet";
import { Octicons } from "@expo/vector-icons";

export default function ScanningModal({ loading }) {
    return (
        loading && (
            <View style={styles.scanningModalContainer}>
                <Octicons
                    style={{
                        margin: 10,
                    }}
                    name="shield-check"
                    size={36}
                    color="green"
                />

                <Text
                    style={{
                        fontWeight: "bold",
                        width: "80%",
                        textAlign: "center",
                    }}>
                    Checking images for inappropriate content. Hang tight.
                </Text>

                <ActivityIndicator
                    size="large"
                    color={styles.colors.darkAccentColor}
                />
            </View>
        )
    );
}
