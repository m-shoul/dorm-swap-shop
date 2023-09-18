import {StyleSheet} from 'react-native';
import * as Font from 'expo-font';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F9F7F7',
    },
    forms: {
      width: "80%",
      paddingTop: 20,
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
        backgroundColor: "white",
        borderColor: "#B3B3B3",
      },
    
      loginHeader: {
        paddingTop: 130,
        paddingBottom: 20,
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
      button: {
        textAlign: "center",
      },
      accountButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
      }
})
export default styles;