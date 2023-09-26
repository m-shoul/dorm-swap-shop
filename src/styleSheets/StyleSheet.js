import { StyleSheet } from "react-native";
import * as Font from "expo-font";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    //justifyContent: 'center',
    backgroundColor: "#F9F7F7",
  },
  forms: {
    width: "80%",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#3F72AF",
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    marginTop: 50,
  },
  createUserInput: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 20,
    padding: 7,
    backgroundColor: "white",
    borderColor: "#B3B3B3",
  },
  createUserInputError: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 20,
    padding: 7,
    backgroundColor: "white",
    borderColor: "#ff0000",
  },

  loginHeader: {
    paddingTop: 125,
    margin: 20,
    fontWeight: "bold",
    fontSize: 30,
    alignContent: "center",
    textAlign: "center",
  },
  registerHeader: {
    paddingTop: 50,
    margin: 20,
    fontWeight: "bold",
    fontSize: 30,
    alignContent: "center",
    textAlign: "center",
  },
  resetHeader: {
    paddingTop: "35%",
    margin: 15,
    fontWeight: "bold",
    fontSize: 30,
    alignContent: "center",
    textAlign: "center",
  },
  button: {
    textAlign: "center",
  },
  accountButtons: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
});
export default styles;
