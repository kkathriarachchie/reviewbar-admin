import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyRecaptcha } from "../../../../lib/verifyRecaptcha";
import { getDatabaseConnection } from "@/server/config/db";
import { getAdminUserModel } from "@/server/models/adminUserModels";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 15 * 60, // 15 minutes
    updateAge: 1 * 60, // 1 minute
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
        recaptchaToken: {},
      },
      async authorize(credentials) {
        try {
          // Verify reCAPTCHA first
          if (!credentials?.recaptchaToken) {
            throw new Error("reCAPTCHA verification required");
          }

          const isRecaptchaValid = await verifyRecaptcha(
            credentials.recaptchaToken
          );
          if (!isRecaptchaValid) {
            throw new Error("reCAPTCHA verification failed");
          }

          // Connect to the database
          const conn = await getDatabaseConnection("reviewbar-admin");
          const AdminUser = getAdminUserModel(conn);

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          // Find the user by email
          const user = await AdminUser.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found with the given email");
          }

          // Check if the password matches
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          // Return the user object without the password
          return {
            id: user.user_id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          name: token.name,
          email: token.email,
          image: token.picture,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
