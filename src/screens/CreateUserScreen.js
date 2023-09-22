import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styleSheets/StyleSheet.js";

const CreateUserScreen = ({ navigation }) => {
  useEffect(() => {
    // Trigger form validation when name,
    // email, or password changes
    validateForm();
  }, [firstName, email, password]);

  const createTwoButtonAlert = () =>
    Alert.alert("Alert Title", index, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const handleSubmit = () => {
    if (isFormValid) {
      // Form is valid, perform the submission logic
      console.log("Form submitted successfully!");
    } else {
      // Form is invalid, display error messages
      console.log("Form has errors. Please correct them.");
    }
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [style, setStyle] = useState(styles.createUserInput);

  useEffect(() => {
    // Trigger form validation when name,
    // email, or password changes
    validateForm();
  }, [firstName, email, password]);

  const validateForm = () => {
    let errors = {};

    // Validate name field
    if (!firstName) {
      errors.firstName = "First name is required.";
      setStyle(styles.createUserInputError);
      console.log(errors.firstName);
    } else {
      setStyle(styles.createUserInput);
    }
    if (!lastName) {
      errors.lastName = "Last name is required.";
    }
    if (!username) {
      errors.username = "Username is required.";
    }

    // Validate email field
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }

    // Validate password field
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (!passwordCheck) {
      errors.passwordCheck = "Confirm password";
    } else if (password !== passwordCheck) {
      errors.passwordCheck = "Passwords do not match";
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };
  return (
    <SafeAreaView style={styles.background}>
      <View>
        <Text style={styles.registerHeader}> Register </Text>
      </View>
      <View
        style={{
          backgroundColor: "#B3B3B3",
          height: 1,
          width: "90%",
          marginBottom: 35,
          marginTop: 15,
        }}
      />
      <View style={styles.forms}>
        <TextInput
          style={style}
          placeholder="First name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.createUserInput}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.createUserInput}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.createUserInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.createUserInput}
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.createUserInput}
          secureTextEntry={true}
          placeholder={errors.passwordCheck}
          value={passwordCheck}
          onChangeText={setPasswordCheck}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Create an Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          {
            opacity: isFormValid ? 1 : 0.5,
            backgroundColor: "green",
            borderRadius: 8,
            paddingVertical: 10,
            alignItems: "center",
            marginTop: 16,
            marginBottom: 12,
          },
        ]}
        disabled={!isFormValid}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("LoginScreen")}
        style={styles.accountButtons}
      >
        <Text>Already have an account?</Text>
        <Text>Login</Text>
      </TouchableOpacity>
      {Object.values(errors).map((error, index) => (
        <Text key={index} style={styles.error}>
          {error}
        </Text>
      ))}
    </SafeAreaView>
  );
};

export default CreateUserScreen;
