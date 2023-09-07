import { StyleSheet, Text, SafeAreaView, TextInput, View} from 'react-native';
import React from 'react';

function LoginScreen(props) {
    return (
       <SafeAreaView style={styles.background}>
            <View style={styles.view}>
                <Text>User Name:</Text>
                <TextInput multiline={true} numberOfLines={1} style={styles.textBox}/>
                <Text>Password:</Text>
                <TextInput multiline={true} numberOfLines={1} style={styles.textBox}/>
            </View>
            
       </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    view:{
        alignItems: 'center',
        width: '100%',
    },
    textBox: {
        alignItems: 'center',
        backgroundColor: '#fff',
        width: "50%",
        height: 30,
    }
})

export default LoginScreen;