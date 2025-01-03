import React, { useEffect, useState } from "react";
import { Pressable, View, Image, Text } from "react-native";
import { StyleSheet } from "react-native-web";
import { router, useFocusEffect } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import useConversation from "../zustand/useConversation";
import useGetLastMessage from "../hooks/useGetlastMessage.js";
import useListenLastMessage from "../hooks/useListenLastMessage.js";
import { useSocketContext } from "../context/SocketContext.jsx";

const User = ({ user }) => {
  const [lastMessage, setLastMessage] = useState(null);
  const { setSelectedConversation } = useConversation();
  const { getLastMessage } = useGetLastMessage();

  useEffect(() => {
    async function fetchMessage() {
      setLastMessage(await getLastMessage(user));
    }
    fetchMessage();
  }, [user]);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return lastMessage !== null ? (
    <Pressable
      onPress={() => {
        setSelectedConversation(user);
        router.push(`/conversation`);
      }}
      style={styles.cont2}
    >
      <View style={styles.imgc}>
        <Image
          source={require("../media/avatar.png")}
          style={{ width: 48, height: 48 }}
        />
      </View>

      <View style={styles.cont3}>
        <View style={styles.cont5}>
          <View style={styles.bar}></View>

          <View style={styles.cont4}>
            <Text style={styles.ut}>{user.username}</Text>
            <Text style={styles.lm2}>Go Icon</Text>
          </View>

          <Text numberOfLines={2} style={styles.lm}>
            {lastMessage}
          </Text>
        </View>

        <View style={styles.bar}></View>
      </View>
    </Pressable>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  cont2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
    paddingLeft: 28,
    width: "100%",
  },
  imgc: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    display: "flex",
    width: "16%",
    marginRight: 12,
    textAlign: "center",
  },
  cont3: {
    width: "80%",
    gap: 12,
    height: 84,
    justifyContent: "space-between",
  },
  cont4: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
    justifyContent: "space-between",
  },
  cont5: {
    width: "100%",
    gap: 8,
  },
  bar: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#232627",
  },
  t: {
    color: "#F3F5F7",
    letterSpacing: 2,
    fontFamily: "Inter_600SemiBold",
  },
  ut: {
    color: "#F3F5F7",
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
  },
  lm: {
    color: "#6C7275",
    marginRight: 28,
    lineHeight: 20,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  lm2: {
    color: "#6C7275",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
});

export default User;
