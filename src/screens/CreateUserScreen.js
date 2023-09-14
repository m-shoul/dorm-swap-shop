import {StyleSheet,Text,View,TextInput,Button,Pressable,onPress,title,SafeAreaView,} from "react-native";
import React from "react";
import styles from '../styleSheets/StyleSheet.js';

const CreateUserScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.background}>
      <View>
        <Text style={styles.header}> Register </Text>
      </View>
      <View style={styles.forms}>
        <TextInput style={styles.createUserInput} placeholder="First Name" />
        <TextInput style={styles.createUserInput} placeholder="Last Name" />
        <TextInput style={styles.createUserInput} placeholder="Username" />
        <TextInput style={styles.createUserInput} placeholder="Email" />
        <TextInput
          style={styles.createUserInput}
          secureTextEntry={true}
          placeholder="Password"
        />
        <TextInput
          style={styles.createUserInput}
          secureTextEntry={true}
          placeholder="Confirm Password"
        />

        <Button title="Create Account" />
        <Text
          onPress={() => navigation.navigate("LoginScreen")}
          style={styles.button}
        >
          Already have an account? Login
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CreateUserScreen;
