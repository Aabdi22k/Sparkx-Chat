import React from "react";
import { Stack } from "expo-router";
import { AuthContextProvider } from "../context/AuthContext.jsx";
import { SocketContextProvider } from "../context/SocketContext.jsx";

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <SocketContextProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen
            name="conversations"
            options={{
              contentStyle: { backgroundColor: "black" },
              headerTitle: "Conversations",
              headerLargeTitle: true,
              headerShadowVisible: true,
              headerStyle: {
                backgroundColor: "#000000",
              },
              headerTintColor: "#F3F5F7",
              gestureEnabled: false,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="conversation"
            options={{
              
              headerBackVisible: true,
              headerShown: false,
            }}
          />
        </Stack>
      </SocketContextProvider>
    </AuthContextProvider>
  );
};

export default RootLayout;
