
import { authClient } from "@/config/firebase/client";
import { LoginFormData } from "@/types/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

export const userLogin = async ( userData: LoginFormData) => {

  const { email, password } = userData;
  const response = await signInWithEmailAndPassword(authClient, email, password);
  return response.user;

};
