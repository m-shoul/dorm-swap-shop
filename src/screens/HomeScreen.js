import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
//import styles from '../styleSheets/StyleSheet.js';
import { getAuth, signOut } from "firebase/auth";
//import Svg, { Path } from "react-native-svg";
import HomeComponent from "../assets/svg/home_icon.js";
import ChatComponent from "../assets/svg/chat_icon.js";
import PostComponent from "../assets/svg/post_icon.js";
import ProfileComponent from "../assets/svg/profile_icon.js";
import SettingsComponent from "../assets/svg/settings_icon.js";
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

      <View style={{ backgroundColor: "#B3B3B3", height: 1, marginLeft: 20, marginRight: 20 }} />
      {/* Footer */}
      <View style={{ flexDirection: 'row', width: '100%', height: 100, backgroundColor: '#F9F7F7' }}>
        {/*Nav Icons */}
        <TouchableOpacity onPress={null} style={{ marginLeft: '8%' }}>
          <HomeComponent width="40" height='100' stroke="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={null} style={{ marginLeft: '8%' }}>
          <ChatComponent width="40" height='100' stroke="black" strokeWidth="0.25" />
        </TouchableOpacity>
        <TouchableOpacity onPress={null} style={{ marginLeft: '8%' }}>
          <PostComponent width="40" height='100' stroke="black" strokeWidth='0.05' />
        </TouchableOpacity>
        <TouchableOpacity onPress={null} style={{ marginLeft: '8%' }}>
          <ProfileComponent width="40" height='100' stroke="black" strokeWidth='0.05' />
        </TouchableOpacity>
        <TouchableOpacity onPress={null} style={{ marginLeft: '8%' }}>
          <SettingsComponent width="40" height='100' stroke="black" strokeWidth='0.05' />
        </TouchableOpacity>
      </View>
    </View >
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