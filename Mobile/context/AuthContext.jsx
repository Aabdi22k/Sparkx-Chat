import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const getAU = async () => {
    const au = await AsyncStorage.getItem("user");
    return au != null ? JSON.parse(au) : null;
  };

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    getAU().then((au) => setAuthUser(au));
  }, []);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
