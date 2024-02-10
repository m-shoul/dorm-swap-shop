import {
    Text,
    View,
    TouchableOpacity,
    Modal,
    ScrollView,
    StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import styles from "../(aux)/StyleSheet";
import { router } from "expo-router";
import BackButtonComponent from "../../assets/svg/back_button.js";
import termsOfService from "../../assets/termsOfService.js";
import RoundHeader from "../../components/RoundHeader.js";
import SimpleLogo from "../../assets/svg/simpleLogo_icon.js";
import { Button } from "../../components/Buttons.js";
import HeadShot from "../../components/HeadShot.js";
import EmailComponent from "../../assets/svg/email_icon.js";
import SquareHeader from "../../components/SquareHeader.js";

export default function About() {
    const [modalVisible, setModalVisible] = useState(false);

    const benHeadshot = process.env.BEN_HEADSHOT;
    const mikeHeadshot = process.env.MIKE_HEADSHOT;
    const joeHeadshot = process.env.JOE_HEADSHOT;
    const joshHeadshot = process.env.JOSH_HEADSHOT;

    return (
        <SafeAreaView>
            <SquareHeader height={"6.4%"} />
            <ScrollView>
                <StatusBar barStyle={"light-content"} />
                <RoundHeader height={"19%"} />
                <View
                    style={{
                        flexDirection: "row",
                        paddingHorizontal: "5%",
                        width: "100%",
                        marginBottom: "10%",
                        marginTop: "15%",
                        justifyContent: "center",
                    }}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={{ marginLeft: "-6.5%" }}>
                        <BackButtonComponent></BackButtonComponent>
                    </TouchableOpacity>

                    <View style={{ alignItems: "center", width: "80%" }}>
                        <SimpleLogo />
                        <Text
                            style={[
                                styles.SmallerHeaderFontSize,
                                { textAlign: "center" },
                            ]}>
                            The one-stop shop for all your college needs
                        </Text>
                    </View>
                </View>

                <View style={{ paddingHorizontal: "10%" }}>
                    <View style={{ marginBottom: "5%" }}>
                        <Text style={[styles.boldtext, { marginBottom: "2%" }]}>
                            Our Story
                        </Text>
                        <Text style={styles.normaltext}>
                            Dorm Swap and Shop was created to make it easier for
                            college students to get rid of unwanted goods for
                            members of the campus community. We believe everyone
                            should be able to find what they need with ease,
                            which is why we created this one-stop shop.
                        </Text>
                    </View>

                    <View style={{ marginBottom: "10%" }}>
                        <Text style={[styles.boldtext, { marginBottom: "2%" }]}>
                            Unique
                        </Text>
                        <Text
                            style={[styles.normaltext, { marginBottom: "5%" }]}>
                            Our app is specific to colleges and universities to
                            keep out unwanted buyers and sellers.
                        </Text>
                        <Text style={styles.normaltext}>
                            We only facilitate the communication between buyers
                            and sellers, and do not handle in-app transactions.
                        </Text>
                    </View>

                    <View style={{ marginBottom: "2%", alignItems: "center" }}>
                        <Text style={[styles.boldtext, { marginBottom: "5%" }]}>
                            Meet the Team:
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                marginBottom: "5%",
                            }}>
                            <View
                                style={{
                                    alignItems: "center",
                                    marginRight: "5%",
                                }}>
                                <HeadShot
                                    source={{ uri: mikeHeadshot }}
                                />
                                <Text
                                    style={[
                                        styles.boldtext,
                                        { textAlign: "center" },
                                    ]}>
                                    Mike Shoul
                                </Text>
                                <Text
                                    style={[
                                        styles.normaltext,
                                        { textAlign: "center" },
                                    ]}>
                                    Project Owner & {"\n"} Backend Developer
                                </Text>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <HeadShot
                                    source={{ uri: joshHeadshot }}
                                />
                                <Text
                                    style={[
                                        styles.boldtext,
                                        { textAlign: "center" },
                                    ]}>
                                    Josh Phillips
                                </Text>
                                <Text
                                    style={[
                                        styles.normaltext,
                                        { textAlign: "center" },
                                    ]}>
                                    Backend Developer
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                marginBottom: "5%",
                            }}>
                            <View
                                style={{
                                    alignItems: "center",
                                    marginRight: "5%",
                                }}>
                                <HeadShot
                                    source={{ uri: joeHeadshot }}
                                />
                                <Text
                                    style={[
                                        styles.boldtext,
                                        { textAlign: "center" },
                                    ]}>
                                    Joseph McGillen
                                </Text>
                                <Text
                                    style={[
                                        styles.normaltext,
                                        { textAlign: "center" },
                                    ]}>
                                    Frontend Developer
                                </Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <HeadShot
                                    source={{ uri: benHeadshot }}
                                />
                                <Text
                                    style={[
                                        styles.boldtext,
                                        { textAlign: "center" },
                                    ]}>
                                    Ben Clarke
                                </Text>
                                <Text
                                    style={[
                                        styles.normaltext,
                                        { textAlign: "center" },
                                    ]}>
                                    Frontend Developer {"\n"} & Security Expert
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginBottom: "10%" }}>
                        <Text style={[styles.boldtext, { marginBottom: "2%" }]}>
                            Contact Us
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <EmailComponent />
                            <Text
                                style={[
                                    styles.normaltext,
                                    { marginLeft: "2%" },
                                ]}>
                                dormswapnshop@gmail.com
                            </Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{ paddingHorizontal: "10%", paddingBottom: "15%" }}>
                    <Text style={[styles.boldtext, { marginBottom: "5%" }]}>
                        Terms and Conditions
                    </Text>
                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                            height: 50,
                        }}>
                        <Button
                            width="75%"
                            height="100%"
                            backgroundColor="#3F72AF"
                            title="Terms and Conditions"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="25%"
                            press={() => setModalVisible(true)}
                            titleStyle={[styles.boldtext, { color: "white" }]}
                        />
                    </View>
                </View>

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
            </ScrollView>
        </SafeAreaView>
    );
}
