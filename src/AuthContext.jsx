import { createContext, useState, useEffect } from 'react';

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  
  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext();