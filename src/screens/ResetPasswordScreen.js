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
        <Text style={styles.registerHeader}>Reset Password</Text>
      </View>

      <View style={styles.forms}>
        <Text style={{ textAlign: "center" }}>
          Please enter the email address that is associated with your account
        </Text>
        <TextInput style={styles.createUserInput} placeholder="Email Address" />
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
