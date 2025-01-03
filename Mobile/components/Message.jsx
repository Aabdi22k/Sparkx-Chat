import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { StyleSheet } from "react-native-web";
import { useAuthContext } from "../context/AuthContext";
const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const [isMe, setIsMe] = useState(false);
  useEffect(() => {
    setIsMe(message?.senderId === authUser?._id);
  }, [message]);
  return (
    <View style={isMe ? styles.mce : styles.mcs}>
      <Text style={isMe ? styles.te : styles.ts}>{message.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mce: {
    backgroundColor: "red",
    padding: 12,
    maxWidth: "72%",
    borderRadius: 16,
    borderBottomRightRadius: 0,
    margin: 8,
    alignSelf: "flex-end",
  },
  mcs: {
    backgroundColor: "#141718",
    padding: 12,
    maxWidth: "72%",
    borderRadius: 16,
    borderBottomLeftRadius: 0,
    margin: 8,
    alignSelf: "flex-start",
  },
  te: {
    color: "white",
    textAlign: "right",
    fontSize:16,
  },
  ts: {
    color: "white",
    fontSize:16,
  },
});

export default Message;
