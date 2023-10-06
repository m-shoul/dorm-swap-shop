import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Modal } from "react-native";
import React from "react";
//import styles from '../styleSheets/StyleSheet.js';
import { getAuth, signOut } from "firebase/auth";
import NavComponent from "../components/Component.js";

const HomeScreen = ({ navigation }) => {

  const auth = getAuth();
  // Signs user out 
  const userLogout = async () => {
    await signOut(auth);
    navigation.navigate("LoginScreen");
  }

  const persons = [{
    id: "1",
    name: "Earnest Green",
  },
  {
    id: "2",
    name: "Winston Orn",
  },
  {
    id: "3",
    name: "Carlton Collins",
  },
  {
    id: "4",
    name: "Malcolm Labadie",
  },
  {
    id: "5",
    name: "Michelle Dare",
  },
  {
    id: "6",
    name: "Carlton Zieme",
  },
  {
    id: "7",
    name: "Jessie Dickinson",
  },
  {
    id: "8",
    name: "Julian Gulgowski",
  },
  {
    id: "9",
    name: "Ellen Veum",
  },
  {
    id: "10",
    name: "Lorena Rice",
  },

  {
    id: "11",
    name: "Carlton Zieme",
  },
  {
    id: "12",
    name: "Jessie Dickinson",
  },
  {
    id: "13",
    name: "Julian Gulgowski",
  },
  {
    id: "14",
    name: "Ellen Veum",
  },
  {
    id: "15",
    name: "Lorena Rice",
  },];

  return (
    <View style={{ flex: 1, backgroundColor: "#F9F7F7" }}>
      {/* Scrollable view displaying all the listings */}
      <FlatList>
        data={persons}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.id}
      </FlatList>


      <NavComponent navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  }
});

export default HomeScreen;