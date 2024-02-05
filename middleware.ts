import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

import { apiAuthPrefix, userRoutes } from '@/routes'

export default NextAuth(authConfig).auth(req => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isBlogRoutes = userRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        return null
    }

    if (isLoggedIn && nextUrl.pathname.startsWith('/register' || '/login')) {
        return Response.redirect(new URL('/', nextUrl))
    }


    if (isBlogRoutes && !isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl))
    }

})



export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}