import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  onPress,
  title,
  SafeAreaView,
} from "react-native";
import React from "react";

const ResetPasswordScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Reset Password</Text>
        <Text>
          Please enter the email address that is associtated with your account
        </Text>
        <TextInput placeholder="Email Address" />
        <Button title="Reset Password" />
        <Text onPress={() => navigation.navigate("LoginScreen")}>
          Already have an account? Login
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
