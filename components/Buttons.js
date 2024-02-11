import React, { forwardRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from "../app/(aux)/StyleSheet.js";
import { router } from 'expo-router';

const Button = (props) => {
    return (
        <TouchableOpacity style={{ height: 40, ...props }
        } onPress={() => {
            if (props.press) props.press();
            if (props.href) router.push(props.href);
        }
        }>
            <Text style={props.titleStyle}>{props.title}</Text>
        </TouchableOpacity >
    );
};

export { Button };