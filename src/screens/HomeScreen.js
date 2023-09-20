import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{position:'absolute', right: 20, bottom:20}}>
            <Text>Home Screen</Text>
        </View> 
    </SafeAreaView> 
  );
}

export default HomeScreen;