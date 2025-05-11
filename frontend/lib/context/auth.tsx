"use client";

import { useState, useEffect, useContext, createContext } from "react";

// Define the shape of the authentication context
interface AuthContextType {
	session: string | null;
	addSession: (session: string) => void;
	clearSession: () => void;
	isAuthenticated: boolean;
}

// Define a User type (customize as per your app's requirements)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [session, setSession] = useState<string | null>(null);

	const addSession = (session: string) => {
		setSession(session);
		localStorage.setItem("session", session);
	};

	const clearSession = () => {
		setSession(null);
		localStorage.removeItem("session");
	};

	const isAuthenticated = !(session === null || session === "");

	useEffect(() => {
		const session = localStorage.getItem("session");
		if (session) {
			addSession(session);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{ session, addSession, clearSession, isAuthenticated }}
		>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
