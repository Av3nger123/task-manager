"use client";
import { useState, useEffect, useContext, createContext } from 'react';

// Define the shape of the authentication context
interface AuthContextType {
  session: Session | null;
  addSession: (session: Session) => void;
  clearSession: () => void;
  isAuthenticated: boolean;
}

// Define a User type (customize as per your app's requirements)
export interface Session {
  token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session|null>(null);

  const addSession = (session: Session) => {
    setSession(session);
    localStorage.setItem('session', JSON.stringify(session));
  };

  const clearSession = () => {
    setSession(null);
    localStorage.removeItem('session');
  };

  const isAuthenticated = !!session;

  useEffect(() => {
    const storedUser = localStorage.getItem('session');
    if (storedUser) {
      addSession(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ session, addSession, clearSession, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};