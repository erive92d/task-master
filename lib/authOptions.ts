import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from "next-auth/providers/github"


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
          const {email, password} = credentials
  
         const response = await fetch(`${process.env.NEXTAUTH_URL}/api/account/login`, {
           method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password}),
            cache: "no-store"
          })
  
          const user = await response.json()
  
          if (response.ok && user) {
            return user
          }
          
          return null
  
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