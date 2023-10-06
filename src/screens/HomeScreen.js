import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Modal } from "react-native";
import React, { useState } from "react";
//import styles from '../styleSheets/StyleSheet.js';
import { getAuth, signOut } from "firebase/auth";
import NavComponent from "../components/Component.js";
import { SearchBar } from '@rneui/themed';
import styles from '../styleSheets/StyleSheet.js';

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

  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F7F7" }}>
      <View style={{ flex: 1, backgroundColor: "#F9F7F7" }}>
        <SearchBar
          round
          searchIcon={{ size: 24, color: 'black' }}
          containerStyle={styles.searchContainer}
          inputStyle={{ backgroundColor: 'white', }}
          inputContainerStyle={{ backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderBottomWidth: 1, borderColor: 'black' }}
          onChangeText={setSearch}
          //onClear={(text) => searchFilterFunction('')}
          placeholder="Search"
          value={search}
        />
        {/* Scrollable view displaying all the listings */}
        <FlatList
          data={persons}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ width: '50%', paddingBottom: 2, }}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          numColumns={2}
          keyExtractor={(item) => item.id}
        />
      </View>

      <NavComponent navigation={navigation} />
    </SafeAreaView >
  );
}

export default HomeScreen;