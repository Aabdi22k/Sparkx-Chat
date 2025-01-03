import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useGetMessages = () => {
  const [loading, setLoading] = useState();
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      const token = (await AsyncStorage.getItem("token")) || null;
      if (!token) {
        Toast.show({
          type: "error",
          text1: "Login to continue",
        });
        return;
      }
      setLoading(true);
      const convoId = selectedConversation?._id;

      try {
        const res = await fetch(
          "https://sparkx-backend-5gg2.onrender.com/messages/" + convoId,
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
        setMessages(data);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
