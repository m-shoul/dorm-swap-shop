import React, { forwardRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from "../app/(aux)/StyleSheet.js";
import { router } from 'expo-router';

const Button =
    (props
        // {
        //     flex,
        //     title,
        //     width,
        //     height,
        //     backgroundColor,
        //     borderRadius,
        //     alignItems,
        //     justifyContent,
        //     marginTop,
        //     marginBottom,
        //     marginRight,
        //     press,
        //     href,
        //     titleStyle
        // },
    ) => {
        return (
            <TouchableOpacity style={{ ...props }
                //     {
                //     width, height, backgroundColor, borderRadius, alignItems,
                //     justifyContent, marginTop, marginRight, marginBottom, flex
                // }
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