import { StatusBar } from "expo-status-bar";
import LoginScreen from "./src/screens/LoginScreen";
import CreateUserScreen from "./src/screens/CreateUserScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "./backend/dbFunctions";

const Stack = createNativeStackNavigator();

export default function App() {
    // Uses the useAuth function in dbFunctions to check if there is a user in the app.
    // If there is a user, then we want a different stack to go through. Think about it,
    // We want them to login, and then be able to go through the inner workings of our app...
    // const { user } = useAuth();
    // if (user) {
    //     return (
    //         <>
    //             <StatusBar hidden={true} />

    //             <NavigationContainer>
    //                 <Stack.Navigator>
    //                     <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
    //                     <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
    //                 </Stack.Navigator>
    //             </NavigationContainer>
    //         </>
    //     );
    // } else {
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
    // }
}
