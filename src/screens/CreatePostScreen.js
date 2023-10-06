import { Text, TextInput, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from "react-native";
import {useState, useEffect} from "react";
import styles from "../styleSheets/StyleSheet.js";
import { writeListingData } from "../../backend/dbFunctions.js";

const CreatePostScreen = ({ navigation }) => {
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const getUserID = () => {
        //This may belong in dbFunctions.js
        //This was given by copilot, it is untested

        // const [user, setUser] = useState(null);
        // useEffect(() => {
        //     const unsub = onAuthStateChanged(auth, user => {
        //         console.log('Got user: ', user);
        //         if (user) {
        //             setUser(user);
        //         } else {
        //             setUser(null);
        //         }
        //     })
        //     return unsub;
        // },[])
        // return { user }

        return "placeholder"
    
    }


    const CreatePost = () => {
        // description
        // images
        // price
        // timeUpload "2023-09-13T12:00:00Z"
        // title
        // userId
        userId = getUserID();
        try{
            writeListingData(title, description, price, userId);
            console.log("Post created successfully");
        }
        catch(error){
            console.log(error);
        }

        navigation.navigate("HomeScreen");
    };

    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.resetHeader}>Create Post</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTitle}
                    value={title}
                    placeholder="Title"
                />
                <Text style={styles.text}>Description</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Description"
                />
                <Text style={styles.text}>Price</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPrice}
                    value={price}
                    placeholder="Price"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => CreatePost()}>
                    <Text style={styles.buttonText}>Create Post</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("HomeScreen")}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>

{/* 
            <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}>
                <Text>Home</Text>
            </TouchableOpacity> */}
        </SafeAreaView>
    );
};

export default CreatePostScreen;