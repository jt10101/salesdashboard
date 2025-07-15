import { createContext, useState, useEffect } from "react";
import {
  getInfoFromToken,
  getTokenFromLocalStorage,
} from "@/utils/tokenHandler";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const value = { user, setUser, role, setRole };

  useEffect(() => {
    const token = getTokenFromLocalStorage();

    if (token) {
      const decoded = getInfoFromToken(token);
      const extractedUser = decoded?.user;

      if (extractedUser) {
        setUser(extractedUser);
        setRole(extractedUser.role || "");
      } else {
        setUser(null);
        setRole("");
      }
    } else {
      setUser(null);
      setRole("");
    }
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
