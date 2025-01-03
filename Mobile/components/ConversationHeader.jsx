import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { router } from "expo-router";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";

const ConversationHeader = ({user}) => {
  const { onlineUsers } = useSocketContext();
  const { logout } = useAuth();
  const isOnline = onlineUsers.includes(user?._id);

  const handleLogout = async () => {
    await logout();
  };
  
  return (
    <View style={styles.cont1}>
      <Pressable
        onPress={() => {
          router.push("/conversations");
        }}
      >
        <Text style={styles.t}>Go Back</Text>
      </Pressable>
      <View style={styles.cont2}>
        <Image
          source={require("../media/avatar.png")}
          style={{ width: 32, height: 32 }}
        />
        <Text style={styles.t}>{user?.username}</Text>
        <Text style={styles.t}>{isOnline ? "online" : ""}</Text>
      </View>
      <Pressable onPress={handleLogout}>
        <Text style={styles.t}>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cont1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  cont2: {
    alignItems: "center",
    gap: 4,
  },
  t: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});

export default ConversationHeader;
