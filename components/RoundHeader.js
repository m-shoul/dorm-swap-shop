import {
    View,
} from "react-native";
import React from "react";

export default function RoundHeader({ height }) {
    return (
        <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: height,
            borderBottomLeftRadius: 200,
            borderBottomRightRadius: 200,
            transform: [{ scaleX: 1.2 }],
            backgroundColor: '#112D4E',
        }}>
        </View>
    );
}