import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import React from "react";

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token") || null;
  
  useEffect(() => {
    if (!token) {
      toast.error("Uauthorized");
      return;
    }
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://sparkx-backend-5gg2.onrender.com/api/users/all",
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
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return { loading, users };
};

export default useGetUsers;