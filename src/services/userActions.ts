'use server';

import { adminAuth,adminDb } from "@/config/firebase/admin";
import { User } from "@/types/user";

export async function createNewUser(formData:User) {

    const { email, password, username } = formData;

    const userRef = await adminAuth.createUser({
        email,
        password,
        displayName: username,
    });

    await adminDb.collection("users").doc(userRef.uid).set({
        username,
        email,
        offers: [],
        products: [],
        role: "user",
    })

    return {uid: userRef.uid}
}