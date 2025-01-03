import React from "react";
import useConversation from "../zustand/useConversation.js";
import { useSocketContext } from "../context/SocketContext.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "./Shadcn/Avatar.tsx";

const User = ({ user, isSidebarOpen }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers.includes(user._id);
  return (
        <div
      className={` m-2 gap-4  flex items-center rounded-lg  ${
        isSidebarOpen && "hover:bg-white dark:hover:bg-black cursor-pointer"
      } ${
        isSelected && isSidebarOpen && "bg-white dark:bg-black"
      } transition-colors duration-200`}
      onClick={() => {
        isSidebarOpen && setSelectedConversation(user);
      }}
    >
      <div
        onClick={() => {
          !isSidebarOpen && setSelectedConversation(user);
        }}
        className={`  relative p-1 m-1  ${
          !isSidebarOpen && "hover:bg-white dark:hover:bg-black cursor-pointer"
        } rounded-md ${
          isSelected && !isSidebarOpen && "bg-white dark:bg-black"
        } transition-colors duration-200`}
      >
        <Avatar className="w-8 h-8">
          <AvatarImage src={user.profilePic} />
          <AvatarFallback
            className={`  bg-transparent dark:text-white text-black`}
          >
            {user.fullname[0]}
          </AvatarFallback>
        </Avatar>
        {isOnline && (
          <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full dark:border-gray-800"></span>
        )}
      </div>
      {isSidebarOpen && (
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <div className="font-normal text-sm dark:text-white">
              {user.fullname}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
