import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../../../lib/mongodb"

const handler = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        checks: ['none']
      }),
    ],
    pages: {
      signIn: '/login',
    },
    session: {
      strategy: 'jwt',
    },
    secret:process.env.SECRET,
    callbacks: {
      async session({ session, token, user }) {
        return session
      },
    },
})

export { handler as GET, handler as POST }