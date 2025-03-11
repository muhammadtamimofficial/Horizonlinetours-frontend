import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getUserByEmail } from "./actions/getUserByEmail";
import { createUser } from "./actions/createUser";
// import { createUser } from "./actions/createUser";
// import { Account, User as AuthUser } from "next-auth";
// import { getUserByEmail } from "./actions/getUserByEmail";
// import { createUser } from "./actions/createUser";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // async signIn({
    //   user,
    //   account,
    // }: {
    //   user: AuthUser;
    //   account: Account | null;
    // }) {
    //   // Ensure account is not null and provider is google or github
    //   if (account?.provider === "google" || account?.provider === "github") {
    //     try {
    //       // Ensure user email is defined
    //       if (!user.email) {
    //         console.log("No email provided by user.");
    //         return false;
    //       }

    //       // Get user by email and create new user if not found
    //       const existingUser = await getUserByEmail(user.email);
    //       console.log(existingUser);
    //       if (!existingUser) {
    //         const userCreateRes = await createUser({
    //           username: user.name || "No Name", // Fallback if no name is available
    //           email: user.email,
    //           image: user.image || "", // Fallback if no image is available
    //         });
    //         console.log(userCreateRes);
    //       }
    //       return true;
    //     } catch (err) {
    //       console.log("Error fetching or saving user", err);
    //       return false;
    //     }
    //   }
    //   return false;
    // },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const newUser: {
          username: string | undefined;
          email: string | undefined;
          image: string | undefined;
        } = {
          username: profile?.name,
          email: profile?.email,
          image: profile?.picture,
        };

        const res = await createUser(newUser);
        console.log(res);
      }
      return true;
    },
  },
};

export default NextAuth(authOptions);
