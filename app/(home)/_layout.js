import { Tabs } from 'expo-router/tabs';
export default function AppLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                // Name of the route to hide.
                name="HomeScreen"
                options={{
                    // This tab will no longer show up in the tab bar.
                    href: "HomeScreen",
                }}
            />
            <Tabs.Screen
                // Name of the route to hide.
                name="ChatScreen"
                options={{
                    // This tab will no longer show up in the tab bar.
                    href: "ChatScreen",
                }}
            />
            <Tabs.Screen
                // Name of the route to hide.
                name="CreatePostScreen"
                options={{
                    // This tab will no longer show up in the tab bar.
                    href: "CreatePostScreen",
                }}
            />
            <Tabs.Screen
                // Name of the route to hide.
                name="CreatePostScreen"
                options={{
                    // This tab will no longer show up in the tab bar.
                    href: "CreatePostScreen",
                }}
            />
        </Tabs>
    );
}