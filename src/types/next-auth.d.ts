import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      hasSubscription: boolean
    }
  }

  interface User {
    hasSubscription: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    hasSubscription: boolean
  }
}