import NextAuth from 'next-auth';
import GithubProvider from "next-auth/providers/github"
import { authConfig } from './auth.config';
 
export const authOptions =({
  ...authConfig,
  providers: [
    GithubProvider({      clientId: process.env.GITHUB_ID,      clientSecret: process.env.GITHUB_SECRET,    }),
  ],
});

export default NextAuth(authOptions)