import NextAuth, { Account, Profile } from "next-auth";
import { Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/prismaClient";
import { User } from "@prisma/client";
import { redirect } from "next/dist/server/api-utils";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/error",
    verifyRequest: "/verify-request",
    newUser: "/new-user",
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user: AdapterUser;
      account: Account;
    }) {
      if (account && user) {
        const existUser = await db.user.findFirst({
          where: { email: user.email },
        });
        if (existUser) {
          token.userId = existUser.id.toString();
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.userId) {
        session.user.id = token.userId;
      }
      return session;
    },
    async signIn({ profile, account }: { profile: Profile; account: Account }) {
      if (account.provider == "google") {
        try {
          const existingUser: User | null = await db.user.findFirst({
            where: { email: profile.email },
          });
          if (existingUser) {
            return true;
          }
          const newUser = await db.user.create({
            data: {
              name: profile.name!,
              email: profile.email!,
              avatar: profile.picture!,
            },
          });
          return true;
        } catch (error: any) {
          return false;
        }
      }
      return false;
    },
  },
  site: process.env.NEXTAUTH_URL || "http://localhost:3001",
};
