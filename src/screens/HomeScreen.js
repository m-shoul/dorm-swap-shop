import { Text, View, TouchableOpacity, FlatList, SafeAreaView, Image, Modal, Animated } from "react-native";
import React, { useState } from "react";
import styles from "../styleSheets/StyleSheet.js";
//import { getAuth, signOut } from "firebase/auth";
// import BottomTabNavigator from "../components/Component.js";
// import { NavigationContainer } from "@react-navigation/native";
import { SearchBar } from "@rneui/themed";
//import styles from "../styleSheets/StyleSheet.js";
//import { HeaderComponent } from "../components/headerComponent.js";


const HomeScreen = () => {

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 100);
  const translateYAxis = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
  })

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

  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F7F7" }}>
      <Animated.View style={{
        transform: [{ translateY: translateYAxis }],
        elevation: 4,
        zIndex: 100,
      }}>
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
      </Animated.View>
      {/* </View> */}

      {/* Scrollable view displaying all the listings */}
      <FlatList
        data={persons}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ width: "50%", height: 200, padding: "1%" }}>
            <View style={{ backgroundColor: "white", flex: 1 }}>
              <Image source={require("../assets/expo/splash_screen_dark.png")} style={{ width: "100%", height: "80%" }} />
              <View style={{ backgroundColor: "#B3B3B3", height: 1, width: "100%", marginBottom: "5%" }} />
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id}
        style={{ flex: 1, backgroundColor: "#F9F7F7", paddingTop: "5%" }}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
        bounces={false}
      />
      {/* <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer> */}
      {/* <NavComponent navigation={navigation} /> */}
    </SafeAreaView>
  );
}

export default HomeScreen;