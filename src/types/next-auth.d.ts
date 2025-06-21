import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      hasSubscription: boolean
      hasPaidSubscription: boolean
    }
  }

  interface User {
    hasSubscription: boolean
    hasPaidSubscription: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    hasSubscription: boolean
    hasPaidSubscription: boolean
  }
}