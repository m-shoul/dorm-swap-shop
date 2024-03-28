import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    RefreshControl
} from "react-native";
import React, { useState, useEffect } from "react";
import { Image } from 'expo-image';
import ListImagesComponent from "../assets/svg/list_images.js";
import styles from "../app/(aux)/StyleSheet.js";
import * as ImagePicker from "expo-image-picker";
import { Button } from "./Buttons.js";
import { getAllUserDataForProfile, uploadProfileImage } from "../backend/api/user.js";
import CachedImage from "expo-cached-image";
import RoundHeader from "./RoundHeader.js";
import { router } from "expo-router";
import { ShadowedView } from 'react-native-fast-shadow';

export default function ProfileHeader({ user }) {
    const profileImageUrl = user?.public?.profileImage;

    return (
        <View>
            <RoundHeader height={140} />
            <TouchableOpacity
                style={{
                    alignSelf: "stretch",
                    paddingRight: "5%",
                    marginBottom: "4%",
                }}
                onPress={() => router.push("EditProfile")}
            >
                <Text style={[styles.boldtext, { textAlign: "right", color: styles.colors.lightColor }]}>
                    Edit
                </Text>
            </TouchableOpacity>
            <View style={{
                marginBottom: "5%",
                alignItems: "center",
            }}>
                {Platform.OS === "ios" ? (
                    <ShadowedView
                        style={{
                            shadowOpacity: 0.8,
                            shadowRadius: 20,
                            shadowOffset: {
                                width: 5,
                                height: 3,
                            },
                            backgroundColor: "white",
                            borderRadius: 200,
                        }}
                    >
                        <View
                            style={{
                                width: 190,
                                height: 190,
                                borderRadius: 200,
                                overflow: "hidden",
                                justifyContent: "center",
                            }}>
                            {profileImageUrl ? (
                                <Image
                                    source={{ uri: profileImageUrl }}
                                    // cacheKey={`user-${user.id}-profileImage`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                            ) : (
                                <ListImagesComponent
                                    source={require("../assets/svg/list_images.js")}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        stroke: "black",
                                        strokeWidth: 0.25,
                                        borderBlockColor: "white",
                                    }}
                                />
                            )}
                        </View>
                    </ShadowedView>
                ) :

                    <View style={{ backgroundColor: "white", borderRadius: 200 }}>
                        <View
                            style={{
                                width: 190,
                                height: 190,
                                borderRadius: 200,
                                overflow: "hidden",
                                justifyContent: "center",
                            }}>
                            {profileImageUrl ? (
                                <Image
                                    source={{ uri: profileImageUrl }}
                                    // cacheKey={`user-${user.id}-profileImage`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                            ) : (
                                <ListImagesComponent
                                    source={require("../assets/svg/list_images.js")}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        stroke: "black",
                                        strokeWidth: 0.25,
                                        borderBlockColor: "white",
                                    }}
                                />
                            )}
                        </View>
                    </View>

                }
            </View >

            <View style={{ width: "100%", alignItems: "center" }}>
                <Text style={styles.boldtext}>{user && user.public && `${user.public.fname} ${user.public.lname}`}</Text>
            </View>

            <View
                style={{
                    paddingTop: "5%",
                    flexDirection: "row",
                    marginBottom: "5%",
                    justifyContent: "center",
                    paddingHorizontal: 20,
                }}>
                {/* Goes to saved listings */}
                <Button
                    width="45%"
                    backgroundColor={styles.colors.darkAccentColor}
                    title="My Listings"
                    alignItems="center"
                    justifyContent="center"
                    marginRight="5%"
                    borderRadius={25}
                    href="MyListingsScreen"
                    titleStyle={[styles.boldtext, { color: "white" }]}
                />

                {/* Goes to chats */}
                <Button
                    width="45%"
                    backgroundColor={styles.colors.darkAccentColor}
                    title="Chat"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={25}
                    href="Chat"
                    titleStyle={[styles.boldtext, { color: "white" }]}
                />
            </View>

            <View
                style={{
                    alignSelf: "stretch",
                    paddingLeft: "5%",
                    marginBottom: "4%",
                }}>
                <Text style={styles.boldtext}>Saved Listings</Text>
            </View>
            <View style={{ alignItems: "center" }}>
                <View style={styles.dividerLine} />
            </View>
        </View>
    );
}