//import { View, TouchableOpacity } from "react-native";
import React from "react";
import HomeComponent from "../assets/svg/home_icon.js";
import ChatComponent from "../assets/svg/chat_icon.js";
import PostComponent from "../assets/svg/post_icon.js";
import ProfileComponent from "../assets/svg/profile_icon.js";
import SettingsComponent from "../assets/svg/settings_icon.js";
import HomeScreen from "../screens/HomeScreen.js";
import CreatePostScreen from "../screens/CreatePostScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
//import ReportScreen from "./src/screens/ReportScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false, tabBarStyle: { height: '10%' }, tabBarActiveTintColor: "#3F72AF",
                tabBarInactiveTintColor: "black", tabBarLabelStyle: { fontSize: 13 },
            }}

        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <HomeComponent width="40" height="100" fill={focused ? "#3F72AF" : "black"} strokeWidth="0.25" />
                )
            }} />
            <Tab.Screen name="Chat" component={ChatScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <ChatComponent width="40" height="100" fill={focused ? "#3F72AF" : "black"} strokeWidth="0.25" />
                )
            }} />
            <Tab.Screen name="Post" component={CreatePostScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <PostComponent width="40" height="100" fill={focused ? "#3F72AF" : "black"} strokeWidth="0.25" />
                )
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <ProfileComponent width="40" height="100" fill={focused ? "#3F72AF" : "black"} strokeWidth="0.25" />
                )
            }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <SettingsComponent width="40" height="100" fill={focused ? "#3F72AF" : "black"} strokeWidth="0.25" />
                )
            }} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;
