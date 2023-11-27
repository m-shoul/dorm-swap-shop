import React, { forwardRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from "../app/(aux)/StyleSheet.js";
import { router } from 'expo-router';

const Button = forwardRef(
    (
        {
            title,
            width,
            height,
            backgroundColor,
            borderRadius,
            alignItems,
            justifyContent,
            marginTop,
            press,
            href
        },
        ref
    ) => {
        return (
            <TouchableOpacity style={{
                width, height, backgroundColor, borderRadius, alignItems,
                justifyContent, marginTop
            }} onPress={() => {
                if (press) press();
                if (href) router.push(href);
            }
            }>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity >
        );
    });

export { Button };