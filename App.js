import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import CreateUserScreen from './src/screens/CreateUserScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StatusBar style="auto" />,
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name=" "
          component={LoginScreen}
        />
        <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
   
      
  );
};
