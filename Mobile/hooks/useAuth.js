import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "../context/AuthContext.jsx";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

const getAuthUser = async (token, setAuthUser) => {
  try {
    const res = await fetch("https://sparkx-backend-5gg2.onrender.com/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }
    setAuthUser(data);
    await AsyncStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    Toast.show({
      type: "error",
      text1: error.message,
    });
  }
};

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signUp = async ({ fullname, username, password, confirmPassword }) => {
    const success = handleInputErrors({
      fullname,
      username,
      password,
      confirmPassword,
    });

    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch(
        "https://sparkx-backend-5gg2.onrender.com/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullname,
            username,
            password,
            confirmPassword,
          }),
        }
      );

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      await AsyncStorage.setItem("token", data.token);
      getAuthUser(data.token, setAuthUser);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://sparkx-backend-5gg2.onrender.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      await AsyncStorage.setItem("token", data.token);
      getAuthUser(data.token, setAuthUser);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      setAuthUser(null);
      console.log("logout success");
      router.replace("/");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };

  return { loading, login, logout, signUp };
};

function handleInputErrors({ fullname, username, password, confirmPassword }) {
  if (!fullname || !username || !password || !confirmPassword) {
    Toast.show({
      type: "error",
      text1: "All fields are required",
    });
    return false;
  }

  if (password !== confirmPassword) {
    Toast.show({
      type: "error",
      text1: "Passwords do not match",
    });
    return false;
  }

  if (password.length < 8) {
    Toast.show({
      type: "error",
      text1: "Password must be at least 8 characters",
    });
    return false;
  }

  return true;
}

export default useAuth;
