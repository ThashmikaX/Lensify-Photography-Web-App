import React, { createContext, useState, useContext } from 'react';

// Create a context for the auth state
const AuthContext = createContext();

// Create a provider component
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  const login = (userId) => {
    // Here you would typically fetch the user data from your API
    setAuth({ userId });
  };

  const logout = () => {
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