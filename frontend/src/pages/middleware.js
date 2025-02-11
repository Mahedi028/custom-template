import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
    pages: {
        signIn: "/login", // Redirect unauthenticated users
    },
});

export function middleware(req) {
    const { pathname } = req.nextUrl;

    // Define protected routes
    const protectedRoutes = ["/user/*", "/admin/dashboard"];

    if (protectedRoutes.includes(pathname)) {
        return withAuth(req);
    }

    return NextResponse.next(); // Allow access to public routes
}
