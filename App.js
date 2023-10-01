import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import CreateUserScreen from "./src/screens/CreateUserScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CreatePostScreen from "./src/screens/CreatePostScreen";
import ChatScreen from "./src/screens/ChatScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import ReportScreen from "./src/screens/ReportScreen";

const Stack = createNativeStackNavigator();

export default function App() {
return (
    <NavigationContainer>
    {/* changes color based off of current color scheme */}
    <StatusBar style="auto" />
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Sprint 2 */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

        {/* Sprint 3 */} 
        <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="ReportScreen" component={ReportScreen} />
        
    </Stack.Navigator>
    </NavigationContainer>
)
}
