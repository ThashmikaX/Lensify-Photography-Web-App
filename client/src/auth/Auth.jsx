import React, { createContext, useState, useContext } from 'react';

// Create a context for the auth state
const AuthContext = createContext();

// Create a provider component
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')));

  const login = (userId) => {
    const user = { userId };
    localStorage.removeItem('auth');
    localStorage.setItem('auth', JSON.stringify(user));
    // alert('log in success');
    setAuth(user);
  };

  const logout = () => {
    localStorage.removeItem('auth');
    alert('logged out');
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}