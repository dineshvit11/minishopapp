import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const USER_COOKIE = 'minishop_user';

const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};

const getCookie = (name) => {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split('=').slice(1).join('=')) : null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!successMessage) return undefined;

    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 4000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  useEffect(() => {
    const storedUser = getCookie(USER_COOKIE) || localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        deleteCookie(USER_COOKIE);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    const serializedUser = JSON.stringify(userData);
    setCookie(USER_COOKIE, serializedUser);
    localStorage.setItem('user', serializedUser);
    setSuccessMessage(`Welcome, ${userData.name || 'User'}! Login successful.`);
  };

  const logout = () => {
    setUser(null);
    deleteCookie(USER_COOKIE);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, successMessage, setSuccessMessage }}>
      {children}
    </AuthContext.Provider>
  );
};
