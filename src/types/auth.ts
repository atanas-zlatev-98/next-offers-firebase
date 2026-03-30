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