import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser } from "./actions/createUser";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const newUser: {
          username: string | undefined;
          email: string | undefined;
          image: string | undefined;
        } = {
          username: profile?.name,
          email: profile?.email,
          image: profile?.image,
        };

        const res = await createUser(newUser);
        console.log(res);
      }
      return true;
    },
  },
};

export default NextAuth(authOptions);
