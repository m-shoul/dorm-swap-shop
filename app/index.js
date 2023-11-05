import { TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';

export default function Page() {
    return (
        <TouchableOpacity
            onPress={() => router.replace("(user)/LoginScreen")}
        >
            <Text>Go to Login Page</Text>
        </TouchableOpacity>
    );

}