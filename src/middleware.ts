import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const url = request.nextUrl
    const currentTime = Math.floor(Date.now() / 1000)
    console.log('Token:', token?.exp,currentTime)
    // Check if token has expired
    if (token && currentTime > Number(token.exp)) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    // Redirect authenticated users trying to access the login or root page
    if (token && (url.pathname === '/auth/login' || url.pathname === '/')) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Redirect unauthenticated users trying to access protected routes
    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

// Matching paths for middleware
export const config = {
    matcher: ['/login', '/', '/dashboard/:path*'],
}
