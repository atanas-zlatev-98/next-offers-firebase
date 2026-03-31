"use client";

import { authClient } from "@/config/firebase/client";
import { findUserById } from "@/services/authActions";
import { userLogin } from "@/services/authService";
import { sessionEnd } from "@/session/session";
import { AuthContextType, AuthUser, LoginFormData } from "@/types/auth";
import { onAuthStateChanged, signOut} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async (loginData: LoginFormData) => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(authClient, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await findUserById(firebaseUser.uid);
          setUser(userData);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (loginData: LoginFormData) => {

    const { email, password } = loginData;

    try {
      const user = await userLogin({email, password});
      const idToken = await user.getIdToken();

      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

    } catch (err) {
      if (err instanceof Error) {
        console.error("Login error:", err.message);
      }
    }
  };

  const logout = async () => {
    await fetch("/api/auth/session", {
        method: "DELETE",
    });
    await signOut(authClient);
    setUser(null);
  };

  const authContextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
