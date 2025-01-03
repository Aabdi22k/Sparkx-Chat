import { useSocketContext } from "../context/SocketContext.jsx";
import { useEffect } from "react";
import useConversation from "../zustand/useConversation.js";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    

    socket?.on("newMessage", (newMessage) => {
        if (!selectedConversation) return;
        console.log(newMessage.senderId)
        console.log(selectedConversation._id)
      if (newMessage.senderId == selectedConversation._id) {
        setMessages([...messages, newMessage]);
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
