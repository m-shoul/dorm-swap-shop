import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "../styleSheets/StyleSheet.js";


const ReportScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>Report</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}>
                <Text>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => pickImage()}>
                <Text>Upload Image</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ReportScreen;