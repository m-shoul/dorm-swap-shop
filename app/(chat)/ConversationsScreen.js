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
import { database } from "../../backend/firebase";
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

export default function Conversations() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
    // <SafeAreaView style={styles.background}>
    // <View>
    //     <Text style={styles.resetHeader}>Conversations</Text>
    // </View>
    // <TouchableOpacity onPress={() => router.push("(home)/Home")}>
    //     <Text>Home</Text>
    // </TouchableOpacity>
    <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
        _id: 1,
        }}
    />
    // </SafeAreaView>
  )
}