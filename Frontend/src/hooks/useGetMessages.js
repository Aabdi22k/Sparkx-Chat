import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import { toast } from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState();
  const { messages, setMessages, selectedConversation } = useConversation();
  const token = localStorage.getItem("token") || null;
  
  useEffect(() => {
    if (!token) {
        toast.error("Uauthorized");
        return;
      }
    const getMessages = async () => {
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
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;