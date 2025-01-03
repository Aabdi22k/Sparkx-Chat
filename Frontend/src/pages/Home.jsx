"use client";

import useAuth from "../hooks/useAuth.js";
import useConversation from "../zustand/useConversation.js";
import useGetUsers from "../hooks/useGetUsers.js";
import useGetMessages from "../hooks/useGetMessages.js";
import useListenMessages from "../hooks/useListenMessages.js";
import useSendMessage from "../hooks/useSendMessage.js";
import useGetMyConversations from "../hooks/useGetMyConversations.js";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import User from "../components/User.jsx";
import Message from "../components/Message.jsx";

import { useState, useRef, useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/Shadcn/Avatar.tsx";
import { Button } from "../components/Shadcn/Button.tsx";
import { Input } from "../components/Shadcn/Input.tsx";
import {
  SendHorizontal,
  SmileIcon,
  Search,
  Paperclip,
  Menu,
  Sun,
  Moon,
  FileIcon,
  VideoIcon,
  ImageIcon,
  LogOut,
  Plus,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/Shadcn/Popover.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/Shadcn/Dialog.tsx";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function Home() {
  const { authUser } = useAuthContext();
  const { logout } = useAuth();
  const { users } = useGetMyConversations();
  const { users : allUsers } = useGetUsers();
  const { messages } = useGetMessages();
  const { sendMessage } = useSendMessage();
  const { selectedConversation, setSelectedConversation } = useConversation();
  useListenMessages();

  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const messagesEndRef = useRef(null);
  const sidebarRef = useRef(null);

  const handleAddUser = async (e) => {
    
    if (!newUsername) return;
    if (newUsername.length < 3) {
      toast.error("Search must be at least 3 characters");
      return
    }
    console.log(allUsers)
    const user = allUsers?.find((u) => u.username.toLowerCase().includes(newUsername.toLowerCase()));

    console.log(user)

    if (user) {
      users.push(user)
      setSelectedConversation(user);
      setIsAddUserModalOpen(false);
      setNewUsername("");
    } else {
      toast.error("No User found");
    }
    
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredUsers = users.filter((user) =>
    user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = async (e) => {
    if (!newMessage) return;
    await sendMessage(newMessage);
    setNewMessage("");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage((prevMessage) => prevMessage + emoji.native);
  };

 

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div
      className={`flex overflow-hidden  flex-col sm:flex-row dark:bg-black bg-white h-screen max-h-screen ${
        isDarkMode ? "dark" : ""
      }`}
    >
      {/* Hamburger Menu for Mobile */}
      <div className="sm:hidden fixed top-4 left-4 z-50 p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </Button>
      </div>

      {/* Dark Overlay */}
      {isSidebarOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          aria-hidden="true"
        />
      )}

      {/* Left Sidebar */}
      <div
        ref={sidebarRef}
        className={`${isSidebarOpen ? "sm:flex" : "hidden"} sm:flex ${
          isSidebarOpen ? "flex w-72" : "w-16"
        }  m-3 mr-0 sm:my-8  fixed sm:static inset-0 sm:inset-y-4 sm:left-4 z-50 bg-neutral-200 dark:bg-neutral-800 border-none transition-all duration-300 ease-in-out flex-col  rounded-lg shadow-lg overflow-hidden`}
      >
        <div className="flex-1 overflow-auto  ">
          <div className="p-3">
            {isSidebarOpen ? (
              <div className="relative">
                <Search
                  size={16}
                  className="text-black dark:text-white absolute left-3 top-1/2 transform -translate-y-1/2 "
                />
                <Input
                  placeholder="Search"
                  className="pl-10 py-3 rounded-xl placeholder:text-black dark:placeholder:text-white text-sm outline-none border-none bg-white text-black dark:bg-black dark:text-white"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="dark:hover:bg-black  hover:bg-white w-full"
                onClick={toggleSidebar}
              >
                <Search size={24} />
              </Button>
            )}
          </div>
          <div className="overflow-y-auto   max-h-[90%]">
            {filteredUsers.map((user) => (
              <User
                className="overflow-y-scroll"
                key={user._id}
                user={user}
                isSidebarOpen={isSidebarOpen}
              />
            ))}
          </div>
        </div>
        <div className="p-3 flex-col  border-t-2  border-black z-50  gap-4 flex  ">
          <Button
            variant="ghost"
            size="icon"
            className="dark:hover:bg-black flex justify-start pl-3 py-6  hover:bg-white w-full "
            onClick={logout}
          >
            <>
              <LogOut className="h-5 w-5  dark:text-white text-black " />
              {isSidebarOpen && <span className="pl-6 font-light">Logout</span>}
            </>
          </Button>
          <Dialog
            open={isAddUserModalOpen}
            onOpenChange={setIsAddUserModalOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="flex justify-start pl-3 dark:hover:bg-black hover:bg-white w-full "
                aria-label="Add user"
              >
                <Plus className="h-4 w-4 text-black dark:text-white " />
                {isSidebarOpen && (
                  <span className="pl-6 font-light">Add User</span>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 w-full py-4">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col w-[80%]">
                  <label className="pl-2 dark:text-white text-black" htmlFor="username">Username</label>
                  <Input
                    id="username"
                    placeholder="e.g. Example423$"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="col-span-3 dark:bg-black p-3 rounded-lg bg-white"
                  />
                  </div>
                  <Button
                    onClick={handleAddUser}
                    className="dark:bg-black w-[20%] dark:text-white text-black bg-white"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            size="icon"
            className="dark:hover:bg-black flex justify-start pl-3  hover:bg-white w-full "
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <>
                <Sun className="h-4 w-4 " />
                {isSidebarOpen && (
                  <span className="pl-6 font-light">Light Mode</span>
                )}
              </>
            ) : (
              <>
                <Moon className="h-5 w-5 text-black " />
                {isSidebarOpen && (
                  <span className="pl-6 font-light">Dark Mode</span>
                )}
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent flex justify-start pl-1 cursor-default w-full "
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={authUser.profilePic} />
              <AvatarFallback
                className={`  bg-transparent dark:text-white text-black`}
              >
                {authUser.fullname[0]}
              </AvatarFallback>
            </Avatar>
            {isSidebarOpen && (
              <div className="flex flex-col text-left">
                <span className="pl-4 text-xs text-gray-600 dark:text-gray-400 font-light">@{authUser.username}</span>
                <span className="pl-4 font-light">{authUser.fullname}</span>
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-col overflow-hidden pt-4 pb-2  flex-1 h-full px-4 flex justify-evenly  ">
        <div className="flex items-center  border-b border-neutral-800 pb-4 justify-center  ">
          <div className="flex items-center   text-center gap-3  ">
            <div className="relative">
              <Avatar className="w-8 h-8">
                <AvatarImage src={selectedConversation?.profilePic} />
              </Avatar>
            </div>

            <div className=" font-medium dark:text-white">
              {selectedConversation?.fullname}
            </div>
          </div>
        </div>

        <div className="flex-1 px-2 max-h-[82%] ">
            
            <div   className="  no-scrollbar  flex flex-col gap-4  h-full  overflow-y-auto  " >
            {messages?.length === 0 ? (
              <div className="text-center flex flex-col w-full h-full gap-2 items-center justify-center text-white">
                <h3 className="text-2xl pb-4">Welcome to Sparkx Chat</h3>
                <h6>To get started</h6>
                <h6>1. Ask friends for their username</h6>
                <h6>2. Click the plus icon on the sidebar and input their username</h6>
                <h6>3. Spark a conversation</h6>
              </div>
            ) : (
              messages?.map((message) => (
                <div ref={messagesEndRef} key={message._id}>
                <Message                  
                  message={message}
                />
                </div>
              ))
            )}

          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center  bg-neutral-200 dark:bg-neutral-800 rounded-full p-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="ml-1  rounded-full"
                >
                  <Paperclip className="h-5 w-5 text-black dark:text-white" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-0">
                <Button variant="ghost" className="w-full justify-start">
                  <FileIcon className="mr-2 h-4 w-4" />
                  <span>File</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <VideoIcon className="mr-2 h-4 w-4" />
                  <span>Video</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  <span>Image</span>
                </Button>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <SmileIcon className="h-5 w-5 text-black dark:text-white" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  theme={isDarkMode ? "dark" : "light"}
                />
              </PopoverContent>
            </Popover>
            <Input
              placeholder="Type a message..."
              className=" ml-3 placeholder:text-black dark:placeholder:text-white text-sm bg-transparent"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />

            <Button
              size="icon"
              className="mr-2 hover:scale-110 rounded-full bg-transparent hover:bg-transparent "
              onClick={handleSendMessage}
            >
              <SendHorizontal className="dark:text-white text-black" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
