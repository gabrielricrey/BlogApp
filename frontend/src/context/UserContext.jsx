import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const verifyUser = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:3000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoggedInUser(res.data);
    } catch (error) {
      console.log("Kunde inte verifiera användare:", error.message);
      localStorage.removeItem("token");
    }
  };
  
  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, verifyUser }}>
      {children}
    </UserContext.Provider>
  );
};

