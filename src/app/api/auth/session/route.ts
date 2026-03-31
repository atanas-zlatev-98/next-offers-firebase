import { NextRequest,NextResponse } from "next/server";
import { adminAuth } from "@/config/firebase/admin";
import { createSession } from "@/session/session";

export async function POST(req:NextRequest) {
    
    const {idToken} = await req.json();

    try{
        const {uid} = await adminAuth.verifyIdToken(idToken);
        const session = await createSession(uid);

        const response = NextResponse.json({message:"Success"},{status:200});
        response.cookies.set("session", session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 2, // 2 часа
        });
        return response;
    }catch{
        return NextResponse.json({message:"Unauthorized"},{status:401});
    }
}

export async function DELETE() {
    const response = NextResponse.json({message:"Session deleted"},{status:200});
    response.cookies.delete("session");
    return response;
}