import { NextRequest,NextResponse } from "next/server";
import { jwtVerify } from "jose";


const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const protectedRoutes = ["/products","/offers","/add-offer"];
const adminRoutes = ["/admin","/add-user","/add-product"];
const authRoutes = ["/sign-in"];


export default async function middleware(req: NextRequest) {

    const { pathname } = req.nextUrl;
    const session = req.cookies.get("session")?.value;

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    let isValid = false
    let role = null;

    if(session) {
        try{
            const { payload } = await jwtVerify(session, secret);
            isValid = true;
            role = payload.role;
        } catch {
            isValid = false;
        }
    }
 if ((isProtectedRoute || isAdminRoute) && !isValid) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isAuthRoute && isValid) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

    return NextResponse.next();

}

export const config = {
     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}