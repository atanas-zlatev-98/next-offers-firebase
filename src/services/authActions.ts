'use server';
import { adminDb } from "@/config/firebase/admin";

export const findUserById = async (userId: string) => {

    const userSnap = await adminDb.collection("users").doc(userId).get();
    const userData = userSnap.data();

    if(!userSnap.exists || !userData) {
        throw new Error("User not found");
    }

    return {
        uid: userId,
        username: userData.username,
        email: userData.email,
        role: userData.role,
        products: userData.products || [],
        offers: userData.offers || []
    }
}