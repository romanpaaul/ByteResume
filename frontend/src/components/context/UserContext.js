import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Define the logout function
  const logout = () => {
    setUser(null); // Clear user data
    localStorage.removeItem('userId'); // Clear local storage if used
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
