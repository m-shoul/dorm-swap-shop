import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from "react-native";
import NavComponent from "../components/Component.js";
import styles from "../styleSheets/StyleSheet.js";

const ChatScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>Chat</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}>
                <Text>Home</Text>
            </TouchableOpacity>
            <NavComponent navigation={navigation} />
        </SafeAreaView>
    );
};

export default ChatScreen;