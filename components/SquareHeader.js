import { View } from "react-native";
import React from "react";
import styles from "../app/(aux)/StyleSheet.js";

export default function SquareHeader({ height }) {
    return (
        <View
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: height,
                backgroundColor: styles.colors.darkColor,
            }}>
        </View>
    );
}
