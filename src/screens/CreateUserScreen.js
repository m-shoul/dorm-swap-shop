import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styleSheets/StyleSheet.js";

const CreateUserScreen = ({ navigation }) => {
  //All of the states that are used to store the actual values of the text inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  //All of the states that are used to store the styles
  const [firstNameStyle, setFirstNameStyle] = useState(styles.createUserInput);
  const [lastNameStyle, setLastNameStyle] = useState(styles.createUserInput);
  const [usernameStyle, setUsernameStyle] = useState(styles.createUserInput);
  const [emailStyle, setEmailStyle] = useState(styles.createUserInput);
  const [passwordStyle, setPasswordStyle] = useState(styles.createUserInput);
  const [passwordCheckStyle, setPasswordCheckStyle] = useState(
    styles.createUserInput
  );

  //All of the states that are used to store the error messages
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageFirst, setErrorMessageFirst] = useState("");
  const [errorMessageLast, setErrorMessageLast] = useState("");
  const [errorMessageUsername, setErrorMessageUsername] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [errorMessageConfirm, setErrorMessageConfirm] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);
  let validate = 0;
  useEffect(() => {
    console.log("Reached useEffect");
    // Trigger form validation when name, email, or password changes
    if (validate == 1) {
      validateForm();
    }
  }, [firstName, lastName, username, email, password, passwordCheck]);

  const handleSubmit = () => {
    console.log("Reached handleSubmit");
    validateForm();
    validate = 1;
  };

  const validateForm = () => {
    let errorCount = 0;
    let emptyFields = 0;
    console.log("Reached validateForm");
    console.log(validate);
    // Validate first name field
    if (!firstName) {
      setErrorMessageFirst("First name is required.");
      setFirstNameStyle(styles.createUserInputError);
      emptyFields++;

      errorCount++;
    } else {
      setErrorMessageFirst("");
      setFirstNameStyle(styles.createUserInput);
    }
    //validate last name field
    if (!lastName) {
      setErrorMessageLast("Last name is required.");
      setLastNameStyle(styles.createUserInputError);
      emptyFields++;
      errorCount++;
    } else {
      setErrorMessageLast("");
      setLastNameStyle(styles.createUserInput);
    }
    //validate username field
    if (!username) {
      setErrorMessageUsername("Username is required.");
      setUsernameStyle(styles.createUserInputError);
      emptyFields++;
      errorCount++;
    } else {
      setErrorMessageUsername("");
      setUsernameStyle(styles.createUserInput);
    }

    // Validate email field
    if (!email) {
      setErrorMessageEmail("Email is required.");
      setEmailStyle(styles.createUserInputError);
      emptyFields++;
      errorCount++;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessageEmail("Email is invalid.");
      setEmailStyle(styles.createUserInputError);
      errorCount++;
    } else {
      setErrorMessageEmail("");
      setEmailStyle(styles.createUserInput);
    }

    // Validate password field
    if (!password) {
      setErrorMessagePassword("Password is required.");
      setPasswordStyle(styles.createUserInputError);
      emptyFields++;
      errorCount++;
    } else if (password.length < 6) {
      setErrorMessagePassword("Password must be at least 6 characters.");
      setPasswordStyle(styles.createUserInputError);
      emptyFields++;
      errorCount++;
    } else {
      setErrorMessagePassword("");
      setPasswordStyle(styles.createUserInput);
    }

    if (!passwordCheck) {
      setErrorMessageConfirm("Password confirmation is required.");
      setPasswordCheckStyle(styles.createUserInputError);
      emptyFields++;
      errorCount++;
    } else if (password !== passwordCheck) {
      setErrorMessageConfirm("Passwords must match.");
      setPasswordCheckStyle(styles.createUserInputError);
      errorCount++;
    } else {
      setErrorMessageConfirm("");
      setPasswordCheckStyle(styles.createUserInput);
    }

    if (emptyFields > 2) {
      setErrorMessage("Please fill out all fields.");
      setErrorMessageConfirm("");
      setErrorMessageEmail("");
      setErrorMessageFirst("");
      setErrorMessageLast("");
      setErrorMessagePassword("");
      setErrorMessageUsername("");
    } else {
      setErrorMessage("");
    }

    if (errorCount === 0) {
      navigation.navigate("LoginScreen");
    }
    // Set the errors and update form validity
    // setErrors(errors);
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
      {errorMessage && (
        <Text style={{ color: "red", paddingBottom: 10, marginTop: -15 }}>
          {errorMessage}
        </Text>
      )}
      <View style={styles.forms}>
        <TextInput
          style={firstNameStyle}
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        {errorMessageFirst && (
          <Text style={{ color: "red", paddingBottom: 10, marginTop: -15 }}>
            {errorMessageFirst}
          </Text>
        )}
        <TextInput
          style={lastNameStyle}
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        {errorMessageLast && (
          <Text style={{ color: "red", paddingBottom: 10 }}>
            {errorMessageLast}
          </Text>
        )}
        <TextInput
          style={usernameStyle}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        {errorMessageUsername && (
          <Text style={{ color: "red", paddingBottom: 10 }}>
            {errorMessageUsername}
          </Text>
        )}
        <TextInput
          style={emailStyle}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {errorMessageEmail && (
          <Text style={{ color: "red", paddingBottom: 10 }}>
            {errorMessageEmail}
          </Text>
        )}
        <TextInput
          style={passwordStyle}
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {errorMessagePassword && (
          <Text style={{ color: "red", paddingBottom: 10 }}>
            {errorMessagePassword}
          </Text>
        )}
        <TextInput
          style={passwordCheckStyle}
          secureTextEntry={true}
          placeholder={"Confirm Password"}
          value={passwordCheck}
          onChangeText={(text) => setPasswordCheck(text)}
        />
        {errorMessageConfirm && (
          <Text style={{ color: "red", paddingBottom: 10 }}>
            {errorMessageConfirm}
          </Text>
        )}
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
        <Text style={styles.loginText}>Create an Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("LoginScreen")}
        style={styles.accountButtons}
      >
        <Text>Already have an account?</Text>
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateUserScreen;
