import { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import { toast } from "react-hot-toast";
const useSendMessage = () => {
  const [loading, setLoading] = useState();
  const { messages, setMessages, selectedConversation } = useConversation();
  const token = localStorage.getItem("token") || null;
  if (!token) {
    toast.error("Uauthorized");
    return;
  }
  const sendMessage = async (message) => {
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
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;