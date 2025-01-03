import React from "react";
import { useAuthContext } from "../context/AuthContext";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const fromMe = message.senderId === authUser._id;
  return (
    <div className={`flex   gap-2 ${fromMe ? "justify-end" : ""}`}>
      <div className={` ${fromMe === "Me" ? "flex flex-col items-end " : ""}`}>
        <div
          className={`${
            fromMe
              ? "bg-[#DC143C] text-white"
              : "bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white"
          } text-left rounded-xl p-2 max-w-96  inline-block`}
        >
          {message.message}
        </div>
      </div>
    </div>
  );
};

export default Message;
