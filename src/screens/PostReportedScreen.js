import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from "react-native";
import styles from "../styleSheets/StyleSheet.js";

const PostReportedScreen = ({ navigation }) => {
   
    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>Report Listing</Text>
            </View>

            <Text>Post reported. Thank you for your feedback.</Text>

            <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}>
                <Text>Return to Listings</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("ChatScreen")}>
                <Text>Return to Chat</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

export default PostReportedScreen;