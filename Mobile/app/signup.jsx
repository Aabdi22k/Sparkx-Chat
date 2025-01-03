import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useAuthContext } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";

const Signup = () => {
  const { signup } = useAuth();
  const { authUser } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullName] = useState("");

  useEffect(() => {
    if (authUser) {
      router.push("/conversations");
    }
  }, [authUser]);

  const keyboardVerticalOffset = 12;

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  const handleSubmit = async () => {
    await signup({ fullname, username, password, confirmPassword });
  };
  return (
    <>
      <ScrollView
        scrollEnabled={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="never"
        contentContainerStyle={styles.cont1}
      >
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={styles.cont2}
        >
          <View style={styles.cont3}>
            <Text style={styles.header}>Sign Up</Text>
          </View>
          <View style={styles.cont3}>
            <View style={styles.cont4}>
              <View style={styles.cont5}>
                <TextInput
                  value={fullname}
                  onChangeText={(text) => {
                    setFullName(text);
                  }}
                  style={styles.ti}
                  placeholderTextColor={"#6C7275"}
                  placeholder="Full Name"
                  keyboardAppearance="dark"
                ></TextInput>

                <View style={styles.bar}></View>
              </View>
              <View style={styles.cont5}>
                <TextInput
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                  }}
                  style={styles.ti}
                  placeholderTextColor={"#6C7275"}
                  placeholder="Username"
                  keyboardAppearance="dark"
                ></TextInput>
                <View style={styles.bar}></View>
              </View>
              <View style={styles.cont5}>
                <TextInput
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  secureTextEntry={true}
                  style={styles.ti}
                  placeholderTextColor={"#6C7275"}
                  keyboardAppearance="dark"
                  placeholder="Password"
                ></TextInput>
                <View style={styles.bar}></View>
              </View>
              <View style={styles.cont5}>
                <TextInput
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                  }}
                  secureTextEntry={true}
                  style={styles.ti}
                  placeholderTextColor={"#6C7275"}
                  keyboardAppearance="dark"
                  placeholder="Confirm password"
                ></TextInput>
                <View style={styles.bar}></View>
              </View>
            </View>
          </View>
          <View style={styles.cont3}>
            <Pressable style={styles.s} onPress={handleSubmit}>
              <Text style={styles.bt}>Signup Here</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Toast />
    </>
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
    overflow: "hidden",
  },
  cont2: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 24,
    marginBottom: 256,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 48,
  },
  cont3: {
    width: "100%",
    alignItems: "center",
    gap: 100,
  },
  cont4: {
    gap: 52,
    width: "96%",
    maxWidth: 400,
  },
  header: {
    color: "#F3F5F7",
    fontSize: 40,
    fontWeight: "600",
    letterSpacing: 4,
    fontFamily: "Inter_600SemiBold",
  },
  ti: {
    paddingLeft: 8,
    fontSize: 16,
    color: "#F3F5F7",
  },
  tifocus: {
    paddingLeft: 8,
    borderColor: "transparent",
    color: "#F3F5F7",
  },
  s: {
    width: "96%",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "crimson",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "transparent",
    maxWidth: 400,
    padding: 12,
  },
  cont5: {
    gap: 16,
  },
  bar: {
    width: "100%",
    height: 4,
    backgroundColor: "#343839",
    borderRadius: "12px",
  },
  bt: {
    fontFamily: "Inter_500Medium",
    color: "#F3F5F7",
    letterSpacing: 1,
  },
});

export default Signup;
