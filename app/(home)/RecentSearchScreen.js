import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "@rneui/themed";
import styles from "../(aux)/StyleSheet";
import { router } from "expo-router";


export default function RecentSearches() {
    return (
        <SafeAreaView style={styles.background}>
            <SearchBar
                round
                searchIcon={{ size: 24, color: "black" }}
                containerStyle={styles.searchContainer}
                inputStyle={{ backgroundColor: "#fff" }}
                inputContainerStyle={{
                    backgroundColor: "#fff", borderRadius: 40,
                    borderWidth: 1, borderBottomWidth: 1, borderColor: "#B3B3B3"
                }}
                onChangeText={setSearch}
                //onClear={(text) => searchFilterFunction("")}
                placeholder="Search"
                value={search}
            />
            <View>
                <Text style={styles.resetHeader}>RecentSearches</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("HomeScreen")}>
                <Text>Home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
