import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import styles from "../styleSheets/StyleSheet.js";

const ResetPasswordScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.background}>
      <View>
        <Text
          style={{
            paddingTop: "35%",
            margin: 15,
            fontWeight: "bold",
            fontSize: 30,
            alignContent: "center",
            textAlign: "center",
          }}
        >
          Reset Password
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#B3B3B3",
          height: 1,
          width: "90%",
          marginBottom: 25,
          marginTop: 40,
        }}
      />

      <View style={styles.forms}>
        <Text style={{ textAlign: "center", marginBottom: 25 }}>
          Please enter the email address that is associated with your account
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 20,
            fontSize: 20,
            padding: 7,
            marginBottom: -10,
            backgroundColor: "white",
            borderColor: "#B3B3B3",
          }}
          placeholder="Email Address"
        />
      </View>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Reset Password</Text>
      </TouchableOpacity>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("LoginScreen")}
          style={styles.accountButtons}
        >
          <Text>Already Have an Account?</Text>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
