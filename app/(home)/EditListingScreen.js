import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StyleSheet,
} from "react-native";
import styles from "../(aux)/StyleSheet";
import { router } from "expo-router";
import RoundHeader from "../../components/RoundHeader";


export default function EditListings() {
    return (
        <SafeAreaView>
            <RoundHeader height="25%" />
        </SafeAreaView>
    );
};
