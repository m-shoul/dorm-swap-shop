import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StyleSheet,
} from "react-native";
import { SearchBar } from "@rneui/themed";
import styles from "../styleSheets/StyleSheet.js";

const RecentSearches = ({ navigation }) => {
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
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                <Text>Home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default RecentSearches;
