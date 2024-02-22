import {
    Text,
    View,
    TouchableOpacity,
    Modal,
    ScrollView,
    StatusBar,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import styles from "../(aux)/StyleSheet";
import { router } from "expo-router";
import termsOfService from "../../assets/termsOfService.js";
import RoundHeader from "../../components/RoundHeader.js";
import SimpleLogo from "../../assets/svg/simpleLogo_icon.js";
import { Button } from "../../components/Buttons.js";
import HeadShot from "../../components/HeadShot.js";
import SquareHeader from "../../components/SquareHeader.js";
import { Ionicons } from '@expo/vector-icons';

export default function About() {
    const [modalVisible, setModalVisible] = useState(false);

    const benHeadshot = "https://firebasestorage.googleapis.com/v0/b/dorm-swap-shop.appspot.com/o/teamHeadshots%2FBenClarke.jpg?alt=media&token=1a9c12e8-52d8-4814-aea8-4bdb426ab460";
    const mikeHeadshot = "https://firebasestorage.googleapis.com/v0/b/dorm-swap-shop.appspot.com/o/teamHeadshots%2FMikeShoul.jpg?alt=media&token=c219dbc3-227c-470b-ae0b-42b0bf929547";
    const joeHeadshot = "https://firebasestorage.googleapis.com/v0/b/dorm-swap-shop.appspot.com/o/teamHeadshots%2FJoeMcGillen.jpg?alt=media&token=34ec53a5-a6ee-4ad8-8cfc-b4073193c353";
    const joshHeadshot = "https://firebasestorage.googleapis.com/v0/b/dorm-swap-shop.appspot.com/o/teamHeadshots%2FJoshPhillips.jpg?alt=media&token=ee93d47e-bb40-4834-9a92-8f0b0cafa74e";

    const insets = useSafeAreaInsets();

    return (
        <View style={{ paddingTop: insets.top }}>
            <SquareHeader height={50} />
            <ScrollView>
                <StatusBar barStyle={"light-content"} />
                <RoundHeader height={220} />
                <View
                    style={{
                        flexDirection: "row",
                        paddingHorizontal: "5%",
                        width: "100%",
                        marginBottom: "10%",
                        marginTop: "10%",
                        justifyContent: "center",
                    }}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={{ marginLeft: "-6.5%" }}>
                        <Ionicons name="chevron-back" size={32} color="white" />
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
                            {/* <EmailComponent /> */}
                            <Ionicons name="mail-outline" size={32} color="black" />
                            <Text
                                style={[
                                    styles.normaltext,
                                    { marginLeft: "2%", marginTop: "1%" },
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
                            backgroundColor={styles.colors.darkAccentColor}
                            title="Terms and Conditions"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius={25}
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
        </View>
    );
}
