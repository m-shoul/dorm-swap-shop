import React, { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import styles from "../app/(aux)/StyleSheet.js";

export default function SearchBarHeader({ handleSearch }) {
    const [search, setSearch] = useState("");

    return (
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
            placeholder="Search"
            value={search}
        />
    );
}