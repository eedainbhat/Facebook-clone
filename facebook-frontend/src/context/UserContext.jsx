import React, { createContext, useContext, useEffect, useState } from "react";
import { getHome } from "../services/user.services";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await getHome();
        setUser(userData.user);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw new Error(error.message);
      }
    };
    getUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const UseUserContext = () => useContext(UserContext);
