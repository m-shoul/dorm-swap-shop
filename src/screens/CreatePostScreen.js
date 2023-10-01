import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from "react-native";
import {useState, useEffect} from "react";
import styles from "../styleSheets/StyleSheet.js";

const CreatePostScreen = ({ navigation }) => {
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const CreatePost = () => {
        // description
        // images
        // price
        // timeUpload "2023-09-13T12:00:00Z"
        // title
        // user

    };

    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>Create Post</Text>
            </View>





            <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}>
                <Text>Home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default CreatePostScreen;