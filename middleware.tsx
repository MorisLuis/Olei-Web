import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode('access_secret');

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        console.log("🚫 No hay token, redirigiendo a login...");
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        await jwtVerify(token, SECRET_KEY); // Verifica el token con `jose`
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: [
        /* '/products',
        '/onboarding/:path*',
        '/profile/:path*',
        '/cart/:path*',
        '/receipt/:path*', */
    ],
};
