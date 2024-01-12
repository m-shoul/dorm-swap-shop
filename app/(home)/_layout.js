import { Tabs } from 'expo-router/tabs';
import HomeComponent from "../../assets/svg/home_icon.js";
import ChatComponent from "../../assets/svg/chat_icon.js";
import PostComponent from "../../assets/svg/post_icon.js";
import ProfileComponent from "../../assets/svg/profile_icon.js";
import SettingsComponent from "../../assets/svg/settings_icon.js";

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false, tabBarStyle: { height: '10%' }, tabBarActiveTintColor: "#3F72AF",
                tabBarInactiveTintColor: "black", tabBarLabelStyle: { fontSize: 13 }, gestureEnabled: false,
            }}
        >
            <Tabs.Screen
                // Name of the route to hide.
                name="Home"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <HomeComponent width="40" height="100" fill={focused ? "#3F72AF" : "black"} strokeWidth="0.25" />
                    )
                }}

            />
            <Tabs.Screen
                // Name of the route to hide.
                name="Chat"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <ChatComponent width="40" height="100" fill={focused ? "#3F72AF" : "black"} strokeWidth="0.25" />
                    )
                }}
            />
            <Tabs.Screen
                // Name of the route to hide.
                name="Post"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <PostComponent width="40" height="100" fill={focused ? "#3F72AF" : "black"} strokeWidth="0.25" />
                    )
                }}
            />
            <Tabs.Screen
                // Name of the route to hide.
                name="Profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <ProfileComponent width="40" height="100" fill={focused ? "#3F72AF" : "black"} strokeWidth="0.25" />
                    )
                }}
            />
            <Tabs.Screen
                name='Settings'
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SettingsComponent width="40" height="100" fill={focused ? "#3F72AF" : "black"} strokeWidth="0.25" />
                    )
                }}
            />
            <Tabs.Screen
                // Name of the route to hide.
                name="EditListingScreen"
                options={{
                    // This tab will no longer show up in the tab bar.
                    href: null,
                }}
            />
            <Tabs.Screen
                // Name of the route to hide.
                name="PostReportedScreen"
                options={{
                    // This tab will no longer show up in the tab bar.
                    href: null,
                }}
            />
            <Tabs.Screen
                // Name of the route to hide.
                name="RecentSearchScreen"
                options={{
                    // This tab will no longer show up in the tab bar.
                    href: null,
                }}
            />
            <Tabs.Screen
                // Name of the route to hide.
                name="ReportScreen"
                options={{
                    // This tab will no longer show up in the tab bar.
                    href: null,
                }}
            />
            <Tabs.Screen
                // Name of the route to hide.
                name="MyListingsScreen"
                options={{
                    // This tab will no longer show up in the tab bar.
                    href: null,
                }}
            />
        </Tabs>
    );
}