import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    ScrollView,
} from "react-native";
import { useState } from "react";
import styles from "../(aux)/StyleSheet";
import { router } from "expo-router";
import BackButtonComponent from "../../assets/svg/back_button.js";
import termsOfService from "../../assets/termsOfService.js";

export default function About() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.background}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    paddingHorizontal: "5%",
                }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <BackButtonComponent></BackButtonComponent>
                </TouchableOpacity>

                <View style={{ justifyContent: "center", flex: 1 }}>
                    <Text style={styles.loginHeader}>About Us</Text>
                </View>
            </View>
            <View style={{ paddingHorizontal: "3%" }}>
                <View style={{ marginBottom: "2%" }}>
                    <Text style={[styles.boldtext, { marginBottom: "2%" }]}>
                        Mission Statement:
                    </Text>
                    <Text style={styles.normaltext}>
                        The one stop shop for all your college needs.
                    </Text>
                </View>

                <View style={{ marginBottom: "2%" }}>
                    <Text style={[styles.boldtext, { marginBottom: "2%" }]}>
                        Brand History:{" "}
                    </Text>
                    <Text style={styles.normaltext}>
                        Dorm Swap and Shop was created to solve the problem of
                        college students having to scour different websites and
                        pay hundreds for school resources.
                    </Text>
                </View>

                <View style={{ marginBottom: "2%" }}>
                    <Text style={[styles.boldtext, { marginBottom: "2%" }]}>
                        What Makes us Different:{" "}
                    </Text>
                    <Text style={styles.normaltext}>
                        {" "}
                        - Specific to colleges and universities
                    </Text>
                    <Text style={styles.normaltext}>
                        {" "}
                        - Includes a lost and found feature
                    </Text>
                    <Text style={styles.normaltext}>
                        {" "}
                        - No transactions through the app
                    </Text>
                </View>

                <View style={{ marginBottom: "2%" }}>
                    <Text style={[styles.boldtext, { marginBottom: "2%" }]}>
                        Meet the Team:
                    </Text>
                    <Text style={styles.normaltext}>
                        Project Lead/Owner: Mike Shoul
                    </Text>
                    <Text style={styles.normaltext}>
                        Developers: Joseph McGillen, Ben Clarke, Josh Phillips
                    </Text>
                </View>

                <View style={{ marginBottom: "2%" }}>
                    <Text style={[styles.boldtext, { marginBottom: "2%" }]}>
                        Contact Us:{" "}
                    </Text>
                    <Text style={styles.normaltext}>
                        dormswapnshop@gmail.com
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                style={[
                    styles.loginBtn,
                    {
                        marginBottom: "10%",
                        marginRight: "10%",
                        marginLeft: "10%",
                        marginTop: "10%",
                    },
                ]}
                onPress={() => {
                    setModalVisible(true);
                }}>
                <Text style={styles.buttonText}>Terms of Service</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <Text
                            style={{
                                margin: "10%",
                                marginTop: "20%",
                            }}>
                            {termsOfService}
                        </Text>
                    </ScrollView>
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            top: "8%",
                            right: "5%",
                            padding: 10,
                            backgroundColor: "lightgray",
                            borderRadius: 5,
                        }}
                        onPress={() => setModalVisible(false)}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
