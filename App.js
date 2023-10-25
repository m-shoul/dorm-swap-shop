import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import CreateUserScreen from "./src/screens/CreateUserScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import ReportScreen from "./src/screens/ReportScreen";
import PostReportedScreen from "./src/screens/PostReportedScreen";
import BottomTabNavigator from "./src/components/Component";
import ListingPopup from "./src/components/ListingPopup";
import SavedListings from "./src/screens/SavedListingsScreen";
import Conversations from "./src/screens/ConversationsScreen";
import DeleteAccount from "./src/screens/DeleteAccountScreen";
import RecentSearches from "./src/screens/RecentSearchScreen";
import EditListings from "./src/screens/EditListingScreen";
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            {/* changes color based off of current color scheme */}
            <StatusBar style="auto" />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* Sprint 2 */}
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen
                    name="CreateUserScreen"
                    component={CreateUserScreen}
                />
                <Stack.Screen
                    name="ResetPasswordScreen"
                    component={ResetPasswordScreen}
                />
                <Stack.Screen
                    name="HomeScreen"
                    component={BottomTabNavigator}
                />
                <Stack.Screen name="ReportScreen" component={ReportScreen} />
                <Stack.Screen
                    name="PostReportedScreen"
                    component={PostReportedScreen}
                />
                <Stack.Screen name="SavedListings" component={SavedListings} />
                <Stack.Screen name="Conversations" component={Conversations} />

                <Stack.Screen name="ListingPopup" component={ListingPopup} />
                <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
                <Stack.Screen
                    name="RecentSearches"
                    component={RecentSearches}
                />
                <Stack.Screen name="EditListings" component={EditListings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
