import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../../../lib/mongodb"
import { connect } from "mongoose"
connect();
const handler = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
    ],
    pages: {
      signIn: '/login',
    },
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      session: async ({token,session}) => {
        if (session?.user && token?.sub) {
          session.user.id = token.sub;
        }
        return session;
      },
    },
})

export { handler as GET, handler as POST }