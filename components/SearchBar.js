import React, { useState, useEffect, } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { SearchBar } from '@rneui/themed';
import styles from "../app/(aux)/StyleSheet.js";


export default function SearchBarHeader({ handleSearch }) {
    // animHeaderValue,
    const [search, setSearch] = useState("");

    // const minScroll = 300;

    // const headerHeight = 120;
    // const activeRange = 200;


    // const diffClamp = Animated.diffClamp(animHeaderValue, -minScroll,
    //     activeRange + minScroll);
    // const animatedHeaderHeight = diffClamp.interpolate({
    //     inputRange: [0, activeRange],
    //     outputRange: [0, -headerHeight],
    //     extrapolate: "clamp"
    // })
    return (
        // <Animated.View style={{
        //     zIndex: 1,
        //     transform: [{ translateY: animatedHeaderHeight }]
        // }}>
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
            onChangeText={(text) => { handleSearch(text); setSearch(text) }}
            // onClear={(text) => searchFilterFunction("")}
            placeholder="Search"
            value={search}
        />
        // {/* </Animated.View> */ }

    );

}