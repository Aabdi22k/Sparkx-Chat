import React, { useEffect } from "react";
import { ScrollView, Text, Pressable, View } from "react-native";
import { StyleSheet } from "react-native";
import User from "../components/User.jsx";
import useGetUsers from "../hooks/useGetUsers";
import Toast from "react-native-toast-message";
import useAuth from "../hooks/useAuth";

const Conversations = () => {
  const { logout } = useAuth();
  const { users } = useGetUsers();

  const handleSubmit = async () => {
    await logout();
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.cont1}
        contentInsetAdjustmentBehavior="automatic"
        
      >

        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </ScrollView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  cont1: {
    backgroundColor: "#000000",
    height: "100%",
    position: "relative",
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
});

export default Conversations;
