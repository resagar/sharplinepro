import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth")
    const isDashboard = req.nextUrl.pathname.startsWith("/dashboard")
    const isEditor = req.nextUrl.pathname.startsWith("/editor")
    const isPricing = req.nextUrl.pathname.startsWith("/pricing")

    // Redirect authenticated users away from auth pages
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // Redirect unauthenticated users to signin
    if ((isDashboard || isEditor) && !isAuth) {
      return NextResponse.redirect(
        new URL(`/auth/signin?callbackUrl=${req.nextUrl.pathname}`, req.url)
      )
    }

    // Check subscription for premium routes (dashboard, editor)
    if ((isDashboard || isEditor) && isAuth) {
      const hasValidSubscription = token.hasSubscription || (token as any).hasPaidSubscription
      
      if (!hasValidSubscription) {
        return NextResponse.redirect(new URL("/pricing?subscription_required=true", req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true, // Let middleware handle the logic
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/editor/:path*", "/auth/:path*", "/pricing"]
}