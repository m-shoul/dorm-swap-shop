import { StatusBar } from "expo-status-bar";
import LoginScreen from "./src/screens/LoginScreen";
import CreateUserScreen from "./src/screens/CreateUserScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    (<StatusBar style="auto" />),
    (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
}
