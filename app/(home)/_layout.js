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
                    name="Home"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons name="home-outline" size={25} color={focused ? styles.colors.darkAccentColor : "black"} />
                        )
                    }}

                />
                <Tabs.Screen
                    name="Chat"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons name="chatbox-outline" size={25} color={focused ? styles.colors.darkAccentColor : "black"} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="Post"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons name="add-circle-outline" size={25} color={focused ? styles.colors.darkAccentColor : "black"} />
                        )
                    }}
                />
                <Tabs.Screen
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
                    name="EditListingScreen"
                    options={{
                        href: null,
                    }}
                />
                <Tabs.Screen
                    name="EditProfile"
                    options={{
                        href: null,
                    }}
                />
                <Tabs.Screen
                    name="RecentSearchScreen"
                    options={{
                        href: null,
                    }}
                />
                <Tabs.Screen
                    name="ReportScreen"
                    options={{
                        href: null,
                    }}
                />
                <Tabs.Screen
                    name="MyListingsScreen"
                    options={{
                        href: null,
                    }}
                />
            </Tabs>
        </>
    );
}