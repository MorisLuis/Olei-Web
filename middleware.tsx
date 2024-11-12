import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function Middleware(req: NextRequest) {
    const jwtCookie = req.cookies.get("token");
    const jwt = jwtCookie && jwtCookie.value;

    if (!jwt) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (req.url.includes("login")) {
        if (jwt) {
            return NextResponse.redirect(new URL("/", req.url))
        }
        return NextResponse.next()
    }

    try {
        await jwtVerify(jwt, new TextEncoder().encode("s3Cr3t"));

        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: [
        "/",
        '/products',
        '/onboarding/:path*',
        '/profile/:path*',
        '/cart/:path*',
        '/receipt/:path*',
    ],
}