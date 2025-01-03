import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const getAuthUser = async (token, setAuthUser) => {
  const res = await fetch("https://sparkx-chat.onrender.com/users", {
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
  localStorage.setItem("user", JSON.stringify(data));
};

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signUp = async ({ fullname, username, password, confirmPassword }) => {
    const success = handleInputErrros({
      fullname,
      username,
      password,
      confirmPassword,
    });

    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("https://sparkx-chat.onrender.com/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          username,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("token", data.token);
      getAuthUser(data.token, setAuthUser);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password, platform) => {
    setLoading(true);
    try {
      const res = await fetch("https://sparkx-chat.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("token", data.token);
      getAuthUser(data.token, setAuthUser);
      console.log("token set");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { loading, login, logout, signUp }; // loading is a boolean and signUp is a function that takes an object as an argument. The object has 4 properties: fullname, username, password, and confirmPassword. The function handles input errors and signs up the user. The function returns an object with two properties: loading and sign
};

function handleInputErrros({ fullname, username, password, confirmPassword }) {
  if (!fullname || !username || !password || !confirmPassword) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 8) {
    toast.error("Password must be at least 8 characters");
    return false;
  }

  return true;
}

export default useLogin;
