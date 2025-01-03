import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet } from "react-native-web";
import useSendMessage from "../hooks/useSendMessage";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
const MessageInputBar = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useSendMessage();
  const handleSubmit = async () => {
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  return (
    <View style={styles.cont2}>
      <Pressable style={styles.s2} onPress={handleSubmit}>
        <Text style={styles.bt}>+</Text>
      </Pressable>
      <View style={styles.cont5}>
        <TextInput
          value={message}
          onChangeText={(text) => {
            setMessage(text);
          }}
          style={styles.ti}
          placeholderTextColor={"#6C7275"}
          keyboardAppearance="dark"
          placeholder="Send Message"
        ></TextInput>
        <Pressable style={styles.s} onPress={handleSubmit}>
          <Text style={styles.bt}>L</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cont2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  ti: {
    paddingLeft: 8,
    fontSize: 16,
    color: "#F3F5F7",
    width:'80%',
    maxWidth:'80%',
  },
  cont5: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    borderColor: "#141718",
    borderWidth: 1,
    borderRadius: 100,
    padding: 12,
    backgroundColor: "#141718",
    height: 48,
    width: "84%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  s: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: "crimson",
    alignItems: "center",
    justifyContent: "center",
  },
  s2: {
    width: 36,
    height: 36,
    borderRadius: 100,
    backgroundColor: "#141718",
    alignItems: "center",
    justifyContent: "center",
  },
  bt: {
    fontFamily: "Inter_500Medium",
    color: "#F3F5F7",
    letterSpacing: 1,
  },
});
export default MessageInputBar;
