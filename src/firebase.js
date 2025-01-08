import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [displayNavbar, setDisplayNavbar] = useState(true);
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");

  return (
    <AppContext.Provider
      value={{
        displayNavbar,
        setDisplayNavbar,
        username,
        setUsername,
        userType,
        setUserType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
