import React, { useState, useEffect, } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { SearchBar } from '@rneui/themed';
import styles from "../app/(aux)/StyleSheet.js";


export default function SearchBarHeader({ animHeaderValue }) {
    const Max_Header_Height = 60;
    const Min_Header_Height = 0;
    const [search, setSearch] = useState("");

    const animatedHeaderHeight = animHeaderValue.interpolate({
        inputRange: [0, Max_Header_Height - Min_Header_Height],
        outputRange: [Max_Header_Height, Min_Header_Height],
        extrapolate: 'clamp'
    })
    return (
        <Animated.View style={{ height: animatedHeaderHeight }}>
            <SearchBar
                round
                searchIcon={{ size: 24, color: "black" }}
                containerStyle={styles.searchContainer}
                inputStyle={{ backgroundColor: "#fff" }}
                inputContainerStyle={{
                    backgroundColor: "#fff",
                    borderRadius: 40,
                    borderWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: "#B3B3B3",
                }}
                onChangeText={setSearch}
                //onClear={(text) => searchFilterFunction("")}
                placeholder="Search"
                value={search}
            />
        </Animated.View>

    );

}