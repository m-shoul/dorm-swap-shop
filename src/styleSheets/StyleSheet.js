import {StyleSheet} from 'react-native';
import * as Font from 'expo-font';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9F7F7',
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
    loginText:{
      color: "white",
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
      },
    
      header: {
        margin: 20,
        fontWeight: "bold",
        fontSize: 30,
        alignContent: "center",
        textAlign: "center",
      },
      button: {
        textAlign: "center",
      },
      accountButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
      }
})
export default styles;