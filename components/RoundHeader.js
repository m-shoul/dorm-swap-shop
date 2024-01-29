import {
    View,
    StatusBar,
    SafeAreaView,
} from "react-native";
import React from "react";

export default function RoundHeader() {
    return (
        <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '65%',
            borderBottomLeftRadius: 200,
            borderBottomRightRadius: 200,
            transform: [{ scaleX: 1.2 }],
            backgroundColor: '#112D4E',
            // shadowColor: "#000",
            // shadowOffset: {
            //     width: 0,
            //     height: 4,
            // },
            // shadowOpacity: 0.8,
            // shadowRadius: 3.84,
            // elevation: 5,
        }}>
        </View>
    );
}