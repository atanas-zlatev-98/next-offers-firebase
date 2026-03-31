import { FirebaseError } from "firebase/app";

export function handleFirebaseError(error: FirebaseError): string {

  switch (error.code) {
    case "auth/invalid-credential":
      return "Невалиден имейл или парола.";
    case "auth/user-not-found":
      return "Няма намерен потребител с този имейл.";
    case "auth/wrong-password":
      return "Грешна парола.";
    case "auth/too-many-requests":
      return "Твърде много опити. Опитайте по-късно.";
    case "auth/user-disabled":
      return "Този акаунт е деактивиран.";
    default:
      return "Нещо се обърка. Опитайте отново.";
  }
}
