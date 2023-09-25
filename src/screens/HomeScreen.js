import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F7F7" }}>
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#8E8E93', height: 90 }}>
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;