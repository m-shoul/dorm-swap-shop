import { View, Image } from "react-native";
import React from "react";
import ListImagesComponent from "../assets/svg/list_images";

export default function HeadShot({ source }) {
    return (
        <View
            style={{
                width: 100,
                height: 100,
                borderRadius: 200,
                overflow: "hidden",
                //borderWidth: 2,
                justifyContent: "center",
                backgroundColor: "white",
            }}>
            <Image source={source} style={{ width: "100%", height: "100%" }} />
        </View>);
}