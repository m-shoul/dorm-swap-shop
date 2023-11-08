import { TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function Page() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>
            <TouchableOpacity
                onPress={() => router.replace("(user)/LoginScreen")}
            >
                <Text>Go to Login Page</Text>
            </TouchableOpacity>
        </SafeAreaView>

    );

}