//import { View, TouchableOpacity } from "react-native";
import React from "react";
import HomeComponent from "../assets/svg/home_icon.js";
import ChatComponent from "../assets/svg/chat_icon.js";
import PostComponent from "../assets/svg/post_icon.js";
import ProfileComponent from "../assets/svg/profile_icon.js";
import SettingsComponent from "../assets/svg/settings_icon.js";
import HomeScreen from "../app/(home)/HomeScreen.js";
import CreatePostScreen from "../app/(home)/CreatePostScreen";
import ChatScreen from "../app/(chat)/ChatScreen";
import ProfileScreen from "../app/(home)/ProfileScreen";
import SettingsScreen from "../app/(settings)/SettingsScreen";
import ReportScreen from "../app/(home)/ReportScreen.js";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//export const categories = ["Books", "Furniture", "Appliances", "Decorations", "Other"];
export const categories = [
    { label: "Books", value: "books" },
    { label: "Furniture", value: "furniture" },
    { label: "Appliances", value: "appliances" },
    { label: "Decorations", value: "decorations" },
    { label: "Other", value: "other" }
];

export const conditions = [
    { label: "New", value: "new" },
    { label: "Like New", value: "like new" },
    { label: "Used", value: "used" },
    { label: "Damaged", value: "damaged" }
];


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