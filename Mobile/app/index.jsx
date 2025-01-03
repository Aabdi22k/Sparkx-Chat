import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { Comfortaa_600SemiBold, useFonts } from "@expo-google-fonts/comfortaa";
import { useAuthContext } from "../context/AuthContext.jsx";

const Splash = () => {
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      router.push("/conversations");
    }
  }, [authUser]);

  const [fontsLoaded] = useFonts({
    Comfortaa_600SemiBold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.cont1}>
      <StatusBar barStyle="auto" />
      <View style={styles.cont2}>
        <Image
          source={require("../media/icon.png")}
          style={{ width: 60, height: 60 }}
        />
        <Text style={styles.comfortaa}>Sparkx</Text>
      </View>
      <View style={styles.cont3}>
        <Pressable
          style={styles.s}
          onPress={() => {
            router.push("/signup");
          }}
        >
          <Text style={styles.ot}>Signup Here</Text>
        </Pressable>
        <Pressable
          style={styles.l}
          onPress={() => {
            router.push("/login");
          }}
        >
          <Text style={styles.ot}>Login Here</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  comfortaa: {
    letterSpacing: 8,
    fontSize: 40,
    fontFamily: "Comfortaa_600SemiBold",
    margin: 0,
    color: "#F3F5F7",
  },
  cont1: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#000000",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cont2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    gap: 20,
  },
  cont3: {
    position: "absolute",
    gap: 24,
    bottom: "10%",
    width: "100%",
    alignItems: "center",
  },
  l: {
    width: "80%",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    borderColor: "crimson",
    maxWidth: 400,
    borderWidth: 2,
  },
  s: {
    width: "80%",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "crimson",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "transparent",
    maxWidth: 400,
    padding: 12,
  },
  ot: {
    color: "#F3F5F7",
    fontSize:16
  }
});

export default Splash;
