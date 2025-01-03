import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const token = (await AsyncStorage.getItem("token")) || null;
      if (!token) {
        Toast.show({
          type: "error",
          text1: "Please Login First",
        });
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          "https://sparkx-backend-5gg2.onrender.com/users/all",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setUsers(data.users);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return { loading, users };
};

export default useGetUsers;
