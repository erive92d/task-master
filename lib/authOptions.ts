import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from "next-auth/providers/github"
import prisma from "./prisma";
import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
    providers: [
      GithubProvider({
        name: "GitHub",
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      }),
  
      CredentialsProvider({
        name: "credentials",
        credentials: {},
        
        async authorize(credentials:any, req) {
          
          if(!credentials) {
            throw new Error("No credentials provided")
          }

          const {email, password} = credentials
          
           const user = await prisma.user.findUnique({
          where: { email },
          });
  
         if (!user) {
          throw new Error('No user found with the provided email');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);


        if (!isValidPassword) {
          throw new Error('Incorrect password');
        }

        return user

        },
      })
      ,
    ],
  
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt',
    },
    pages: {
      signIn: "/",
      error: "/error",
    },
    callbacks: {
      jwt: async ({ token, user }) => {
        return { ...token, ...user };
      },
      session: async ({ session, token }) => {
        session.user = token;
   
        return session;
      },
    },
  }