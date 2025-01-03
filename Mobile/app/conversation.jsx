import { router, useRootNavigationState } from "expo-router";
import React, { useEffect, useRef } from "react";
import { View, Text, Dimensions } from "react-native";
import useConversation from "../zustand/useConversation";
import useGetMessages from "../hooks/useGetMessages";
import useListenMessages from "../hooks/useListenMessages";
import Message from "../components/Message";
import MessageInputBar from "../components/MessageInputBar";
import { ScrollView, SafeAreaView, StyleSheet } from "react-native";
import ConversationHeader from "../components/ConversationHeader";
import { KeyboardAvoidingView } from "react-native";

const ConversationPage = () => {
  const { selectedConversation } = useConversation();

  const { messages } = useGetMessages();
  useListenMessages();

  const lastMessageRef = useRef();
  const scrollRef = useRef();

  const rootNavigationState = useRootNavigationState();
  const navigatorReady = rootNavigationState?.key != null;

  useEffect(() => {
    if (!navigatorReady) return;
    if (!selectedConversation) router.replace("/conversations");
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [navigatorReady, messages]);

  return (
    <SafeAreaView style={styles.cont1}>
      <ConversationHeader user={selectedConversation} />
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={12}
        style={styles.cont2}
      >
        <ScrollView
          ref={scrollRef}
          onContentSizeChange={() =>
            scrollRef.current.scrollToEnd({ animated: true })
          }
          contentContainerStyle={{ justifyContent: "flex-end", flexGrow: 1 }}
          style={styles.cont3}
        >
          {messages.map((message, index) => (
            <Message
              key={message._id}
              message={message}
              last={index === messages.length - 1}
            />
          ))}
        </ScrollView>

        <MessageInputBar />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const h = Dimensions.get("window").height;

const styles = StyleSheet.create({
  cont1: {
    backgroundColor: "#000000",
  },
  cont2: {
    overflow: "hidden",
  },
  cont3: {
    height: h * 0.7,
  },
});

export default ConversationPage;
