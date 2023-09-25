import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import CreateUserScreen from "./src/screens/CreateUserScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import HomeScreen from "./src/screens/HomeScreen";
import useAuth from "./backend/dbFunctions";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <>
            <StatusBar hidden={true} />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
                    <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} options={{headerShown: false}} />
                    <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{headerShown: false}} />
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}