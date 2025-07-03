import { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      hasSubscription: boolean
      hasPaidSubscription: boolean
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    hasSubscription: boolean
    hasPaidSubscription: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    hasSubscription: boolean
    hasPaidSubscription: boolean
  }
}