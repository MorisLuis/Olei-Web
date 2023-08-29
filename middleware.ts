import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(req: NextRequest) {
    const jwtCookie = req.cookies.get("token");
    const jwt = jwtCookie && jwtCookie.value;

    /* if (req.nextUrl.pathname.startsWith("/login") && jwt) {
        return NextResponse.redirect(new URL("/products?page=1&limit=20"));
    } */

    if (!jwt) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        await jwtVerify(jwt, new TextEncoder().encode("s3Cr3t"));

        return NextResponse.next();
    } catch (error) {
        console.log({ error })
        return NextResponse.redirect(new URL("/login", req.url));
    }
}
export const config = {
    matcher: [
        "/"
    ],
}