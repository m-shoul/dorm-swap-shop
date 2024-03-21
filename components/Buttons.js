import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const Button = (props) => {
    return (
        <TouchableOpacity style={{ height: 50, ...props }} onPress={() => {
            if (props.press) {
                props.press();
            }

            if (props.href) {
                router.push(props.href);
            }
        }}>
            <Text style={props.titleStyle}>{props.title}</Text>
        </TouchableOpacity >
    );
};

export { Button };