import { Tabs } from 'expo-router/tabs';
import { StatusBar } from 'react-native';
import styles from "../(aux)/StyleSheet";
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <Tabs
                screenOptions={{
                    headerShown: false, tabBarStyle: { height: 85 }, tabBarActiveTintColor: styles.colors.darkAccentColor,
                    tabBarInactiveTintColor: "black", tabBarLabelStyle: { fontSize: 13 }, gestureEnabled: false,
                }}
            >
                <Tabs.Screen
                    // Name of the route to hide.
                    name="Home"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons name="home-outline" size={25} color={focused ? styles.colors.darkAccentColor : "black"} />
                        )
                    }}

                />
                <Tabs.Screen
                    // Name of the route to hide.
                    name="Chat"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons name="chatbox-outline" size={25} color={focused ? styles.colors.darkAccentColor : "black"} />
                        )
                    }}
                />
                <Tabs.Screen
                    // Name of the route to hide.
                    name="Post"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons name="add-circle-outline" size={25} color={focused ? styles.colors.darkAccentColor : "black"} />
                        )
                    }}
                />
                <Tabs.Screen
                    // Name of the route to hide.
                    name="Profile"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons name="person-outline" size={25} color={focused ? styles.colors.darkAccentColor : "black"} />
                        )
                    }}
                />
                <Tabs.Screen
                    name='Settings'
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons name="settings-outline" size={25} color={focused ? styles.colors.darkAccentColor : "black"} />
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
                    name="EditProfile"
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
        </>
    );
}