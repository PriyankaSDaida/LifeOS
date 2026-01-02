import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isAuthPage = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register')

            if (isAuthPage) {
                if (isLoggedIn) return Response.redirect(new URL('/', nextUrl))
                return true
            }

            // Allow API routes to be unprotected? Or handled by API logic.
            // Usually allow public assets.

            return isLoggedIn
        },
    },
    providers: [],
} satisfies NextAuthConfig
