import { Text, View, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import styles from '../styleSheets/StyleSheet.js';
import { getAuth, signOut } from "firebase/auth";

const HomeScreen = ({ navigation }) => {

  const auth = getAuth();

  const userLogout = async () => {
    await signOut(auth);
    navigation.navigate("LoginScreen");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ position: 'absolute', right: 20, bottom: 20 }}>
        <Text>Home Screen</Text>
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={userLogout}>
        <Text style={styles.loginText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HomeScreen;