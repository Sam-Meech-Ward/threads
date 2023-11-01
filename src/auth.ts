import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/GitHub"

import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db"

const drizzleAdapter = DrizzleAdapter(db)
export const authConfig = {
  adapter: drizzleAdapter,
  providers: [GitHub],
  callbacks: {
    session({ session, token, user }) {
      session.user.id = user.id
      return session // The return type will match the one returned in `useSession()`
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      // const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      const paths = ["/dashboard", "/search", "/activity"]
      const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path))

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("api/auth/signin", nextUrl.origin)
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href)
        return Response.redirect(redirectUrl)
      }
      return true
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut, update } = NextAuth(authConfig)
