import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useLastMessage from "../zustand/useLastMessage.js";

const useGetLastMessage = () => {
  const getLastMessage = async (user) => {
    const token = (await AsyncStorage.getItem("token")) || null;
    if (!token) {
      Toast.show({
        type: "error",
        text1: "Login to continue",
      });
      return;
    }

    try {
      const res = await fetch(
        "https://sparkx-backend-5gg2.onrender.com/messages/" + user._id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (data.length) {
        return data.slice(-1)[0].message;
      } else {
        return null;
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };

  return { getLastMessage };
};

export default useGetLastMessage;
