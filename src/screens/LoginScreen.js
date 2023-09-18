import {Text, SafeAreaView, TextInput, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from '../styleSheets/StyleSheet.js';
import { auth } from '../../backend/config/firebaseConfig';
// import { readData } from '../../backend/dbFunctions';

// readData("dorm-swap-shop").then((data) => {
//     console.log(data)
// });

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleLogin = () =>{
        auth
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with:', user.email);
        })
        .catch(error => setErrorMessage('* Invalid Email'))
    }
    

    return (
       <SafeAreaView style={styles.background}>
            <View>
                <Text style={styles.loginHeader}> Login </Text>  
            </View>
            <View style={{backgroundColor: "#B3B3B3", height: 1, width: '90%', marginBottom: 20}} />

            <View style={styles.forms}>
                <TextInput 
                    style={styles.createUserInput}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder="Email or Username" 
                />
                {errorMessage && <Text style={{color: 'red', paddingBottom: 20}}>{errorMessage}</Text>}
                <TextInput 
                    style={styles.createUserInput} 
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder="Password" 
                />
                {errorMessage && <Text style={{color: 'red', paddingBottom: 20}}>{errorMessage}</Text>}
            </View>

            <View style={{flexDirection: 'row', color:'red'}}>
                <Text style={{color:'#585858'}}>Remember Me</Text>
                <Text style={{paddingLeft: 100, color:'#585858'}} onPress={() => navigation.navigate("ResetPasswordScreen")}>Forgot Password</Text>
            </View>
                

            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginText} >LOGIN</Text> 
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('CreateUserScreen')} style={styles.accountButtons} >
                <Text>Not a User? </Text>
                <Text>Create an Account</Text> 
            </TouchableOpacity>    
       </SafeAreaView>
    );
}

export default LoginScreen;


