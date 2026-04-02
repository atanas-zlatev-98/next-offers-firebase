'use server';
import {cookies} from "next/headers";
import {SignJWT, jwtVerify} from "jose";
import { adminDb } from "@/config/firebase/admin";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createSession(userId:string) {

    const userRef = await adminDb.collection("users").doc(userId).get();
    const role = userRef.data()?.role || "user";

    const token = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(secret);
    return token;
}

export async function verifySession() {

    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if(!token) {
        return null;
    }

    try{
        const { payload } = await jwtVerify(token, secret);
        return payload.userId as string;
    }catch{
        return null;

    }
}

export async function destroySession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}
