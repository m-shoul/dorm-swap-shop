import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  return (
    <StatusBar style="auto" />,
    <LoginScreen/>
      
  );
};
