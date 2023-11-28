import React, { forwardRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from "../app/(aux)/StyleSheet.js";
import { router } from 'expo-router';

const Button =
    (
        {
            flex,
            title,
            width,
            height,
            backgroundColor,
            borderRadius,
            alignItems,
            justifyContent,
            marginTop,
            marginRight,
            press,
            href,
            titleStyle
        },
    ) => {
        return (
            <TouchableOpacity style={{
                width, height, backgroundColor, borderRadius, alignItems,
                justifyContent, marginTop, marginRight, flex
            }} onPress={() => {
                if (press) press();
                if (href) router.push(href);
            }
            }>
                <Text style={titleStyle}>{title}</Text>
            </TouchableOpacity >
        );
    };

export { Button };