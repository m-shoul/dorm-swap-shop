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
                // shadowColor: "#000",
                // shadowOffset: {
                //     width: 0,
                //     height: 4,
                // },
                // shadowOpacity: 0.8,
                // shadowRadius: 3.84,
                // elevation: 5,
            }}></View>
    );
}
