import {StyleSheet} from 'react-native';

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
        backgroundColor: "#FF1493",
    },
    remember: {
        padding: 40,
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
})
export default styles;