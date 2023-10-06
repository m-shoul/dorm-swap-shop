import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Modal } from "react-native";
import React from "react";
import HomeComponent from "../assets/svg/home_icon.js";
import ChatComponent from "../assets/svg/chat_icon.js";
import PostComponent from "../assets/svg/post_icon.js";
import ProfileComponent from "../assets/svg/profile_icon.js";
import SettingsComponent from "../assets/svg/settings_icon.js";

export const categories = ["Books", "Furniture", "Appliances", "Decorations", "Other"];

const NavComponent = ({ navigation }) => {
    return (
    <View>
        <View style={{ backgroundColor: "#B3B3B3", height: 1, marginLeft: 20, marginRight: 20 }} />
            {/* Footer */}
        <View style={{ flexDirection: 'row', width: '100%', height: 120, backgroundColor: '#F9F7F7' }}>
                {/*Nav Icons */}
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen') } style={{ marginLeft: '8%' }}>
            <HomeComponent width="40" height='100' stroke="black" strokeWidth="0.25"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')} style={{ marginLeft: '8%' }}>
            <ChatComponent width="40" height='100' stroke="black" strokeWidth="0.25" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CreatePostScreen')} style={{ marginLeft: '8%' }}>
            <PostComponent width="40" height='100' stroke="black" strokeWidth='0.05' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} style={{ marginLeft: '8%' }}>
            <ProfileComponent width="40" height='100' stroke="black" strokeWidth='0.05' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')} style={{ marginLeft: '8%' }}>
            <SettingsComponent width="40" height='100' stroke="black" strokeWidth='0.05' />
            </TouchableOpacity>
        </View>
    </View>
    );
}

export default NavComponent;
