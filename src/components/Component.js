import { View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import HomeComponent from "../assets/svg/home_icon.js";
import ChatComponent from "../assets/svg/chat_icon.js";
import PostComponent from "../assets/svg/post_icon.js";
import ProfileComponent from "../assets/svg/profile_icon.js";
import SettingsComponent from "../assets/svg/settings_icon.js";


//export const categories = ["Books", "Furniture", "Appliances", "Decorations", "Other"];




const NavComponent = ({ navigation }) => {
    const [homeColor, setHomeColor] = useState("black");
    const [chatColor, setChatColor] = useState("black");
    const [postColor, setPostColor] = useState("black");
    const [profileColor, setProfileColor] = useState("black");
    const [settingColor, setSettingColor] = useState("black");
    const switchingPage = async (icon) => {
        if (icon == "home") {
            setHomeColor("#3F72AF");
            setChatColor("black");
            setPostColor("black");
            setProfileColor("black");
            setSettingColor("black");
            navigation.navigate('HomeScreen')
        }
        if (icon == "chat") {
            setHomeColor("black");
            setChatColor("#3F72AF");
            setPostColor("black");
            setProfileColor("black");
            setSettingColor("black");
            navigation.navigate('ChatScreen')
        }
        if (icon == "post") {
            setHomeColor("black");
            setChatColor("black");
            setPostColor("#3F72AF");
            setProfileColor("black");
            setSettingColor("black");
            navigation.navigate('PostScreen')
        }
        if (icon == "profile") {
            setHomeColor("black");
            setChatColor("black");
            setPostColor("black");
            setProfileColor("#3F72AF");
            setSettingColor("black");
            navigation.navigate('ProfileScreen')
        }
        if (icon == "setting") {
            setHomeColor("black");
            setChatColor("black");
            setPostColor("black");
            setProfileColor("black");
            setSettingColor("#3F72AF");
            navigation.navigate('SettingsScreen')
        }
    }
    return (
        <View>
            <View style={{ backgroundColor: "#B3B3B3", height: "1%", marginLeft: "2%", marginRight: "2%", }} />
            {/* Footer */}
            <View style={{ flexDirection: 'row', width: '100%', backgroundColor: '#F9F7F7' }}>
                {/*Nav Icons */}
                <TouchableOpacity onPress={() => switchingPage("home")} style={{ marginLeft: '8%' }}>
                    <HomeComponent width="40" height="100" fill={homeColor} strokeWidth="0.25" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => switchingPage("chat")} style={{ marginLeft: '8%' }}>
                    <ChatComponent width="40" height='100' fill={chatColor} strokeWidth="0.25" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => switchingPage("post")} style={{ marginLeft: '8%' }}>
                    <PostComponent width="40" height='100' fill={postColor} strokeWidth='0.05' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => switchingPage("profile")} style={{ marginLeft: '8%' }}>
                    <ProfileComponent width="40" height='100' fill={profileColor} strokeWidth='0.05' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => switchingPage("setting")} style={{ marginLeft: '8%' }}>
                    <SettingsComponent width="40" height='100' fill={settingColor} strokeWidth='0.05' />
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default NavComponent;