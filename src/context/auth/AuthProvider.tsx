"use client";

import { authClient } from "@/config/firebase/client";
import { findUserById } from "@/services/authActions";
import { userLogin } from "@/services/authService";
import { AuthContextType, AuthUser, LoginFormData } from "@/types/auth";
import { AuthError } from "@/types/error";
import { FirebaseError } from "firebase/app";
import { onAuthStateChanged, signOut} from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { handleFirebaseError } from "@/config/firebase/firebaseErrorHandler";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: { loginError: "", logoutError: "" },
  login: async (loginData: LoginFormData) => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const router = useRouter();
  
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error,setError] = useState<AuthError>({ loginError: "", logoutError: "" });
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

      router.push('/');

    } catch (err) {
      if (err instanceof FirebaseError) {
       setError((prev) => ({ ...prev, loginError: handleFirebaseError(err) }));
      }
    }
  };

  const logout = async () => {
    try{

      await fetch("/api/auth/session", {
        method: "DELETE",
      });
      
      await signOut(authClient);
      setUser(null);
      router.push('/');

    }catch(err){
      if (err instanceof FirebaseError) {
        setError((prev) => ({ ...prev, logoutError: err.message }));
      }
    }
  };

  const authContextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    error
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
