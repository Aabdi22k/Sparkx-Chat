import { useState } from "react";
import useConversation from "../zustand/useConversation";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useSendMessage = () => {
  const [loading, setLoading] = useState();
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    const token = (await AsyncStorage.getItem("token")) || null;
    if (!token) {
      Toast.show({
        type: "error",
        text1: "Please login to send message",
      });
      return;
    }
    setLoading(true);
    const convoId = selectedConversation?._id;
    try {
      const res = await fetch(
        "https://sparkx-backend-5gg2.onrender.com/messages/send/" + convoId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages(messages.concat(data));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
