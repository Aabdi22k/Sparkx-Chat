import { useSocketContext } from "../context/SocketContext.jsx";
import { useEffect } from "react";
import useConversation from "../zustand/useConversation.js";
import useLastMessage from "../zustand/useLastMessage.js";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { lastMessage, setLastMessage } = useLastMessage();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
        console.log('ran', newMessage)
      setLastMessage(newMessage);
    });

    return () => socket?.off("newMessage");
  }, [socket, setLastMessage, lastMessage]);
};

export default useListenMessages;
