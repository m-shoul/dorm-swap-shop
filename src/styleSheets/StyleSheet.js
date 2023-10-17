import { StyleSheet, Dimensions } from "react-native";
import * as Font from "expo-font";

const { width } = Dimensions.get("window");
const ButtonFontSize = 16;
const HeaderFontSize = 8;
const NormalFontSize = 20;
const HintFontSize = 24;
buttonText = width / ButtonFontSize;
headerText = width / HeaderFontSize;
normalText = width / NormalFontSize;
hintText = width / HintFontSize;

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
    borderRadius: 25, //was 25
    height: "7%", //was 50
    alignItems: "center",
    justifyContent: "center",
    marginTop: "12%", //was 40
    backgroundColor: "#3F72AF",
  },
  buttonText: {
    color: "white",
    fontSize: buttonText,
    fontWeight: "bold",
  },
  container: {
    marginTop: 50,
  },
  createUserInput: {
    marginBottom: "6%", //was 20
    borderWidth: 1, //was 1
    borderRadius: 20,
    fontSize: normalText,
    padding: "3%", //was 7
    backgroundColor: "white",
    borderColor: "#B3B3B3",
  },
  createUserInputError: {
    marginBottom: "6%", //was 20
    borderWidth: 1, //was 1
    borderRadius: 20, //was 20
    fontSize: normalText,
    padding: "2%", //was 7
    backgroundColor: "white",
    borderColor: "#ff0000",
  },

  createUserInputError: {
    marginBottom: "6%", //was 20
    borderWidth: 1, //was 1
    borderRadius: 20,
    fontSize: normalText,
    paddingLeft: "3%", //was 7
    backgroundColor: "white",
    borderColor: "red",
  },

  loginHeader: {
    paddingTop: "45%",
    margin: "5%",
    fontWeight: "bold",
    fontSize: headerText,
    alignContent: "center",
    textAlign: "center",
  },
  registerHeader: {
    paddingTop: "15%",
    margin: "10%", //was 20
    fontWeight: "bold",
    fontSize: headerText,
    alignContent: "center",
    textAlign: "center",
  },
  resetHeader: {
    paddingTop: "35%",
    margin: "15%", //was 20
    fontWeight: "bold",
    fontSize: headerText,
    alignContent: "center",
    textAlign: "center",
  },
  button: {
    textAlign: "center",
  },
  notUserButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10%",
  },
  notUserButtonText: {
    fontSize: hintText,
  },
  dividerLine: {
    backgroundColor: "#B3B3B3",
    height: 1,
    width: "90%",
    marginBottom: 25,
    marginTop: 0,
  },
  searchContainer: {
    position: "absolute",
    backgroundColor: "#F9F7F7",
    borderBottomColor: "#F9F7F7",
    borderTopColor: "#F9F7F7",
    width: "100%",
    height: 40,
    justifyContent: "center",
  },
});
export default styles;
