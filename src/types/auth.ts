import { Auth } from "firebase/auth";

export type Role = "admin" | "user";

export type AuthUser = {
    uid: string;
    username: string;
    email: string;
    role: Role;
}

export type LoginFormData = {
    email: string;
    password: string;
}

export type AuthContextType = {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (loginData: LoginFormData) => Promise<void>;
    logout: () => Promise<void>;
}