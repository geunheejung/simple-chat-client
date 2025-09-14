
import NextAuth, { DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { fetchSignIn } from "./app/lib/http";
 
export const { handlers, signIn, signOut, auth } = NextAuth((req, res) => {
  console.log(req)
  return {
  secret: process.env.AUTH_SECRET || '',
  providers: [
    Credentials({
      credentials: {
        email: {
          type: 'email', // HTML input 타입
          label: 'Email', // 입력 라벨
          placeholder: 'Email' // placeholder 텍스트
        },
        password: {
          type: 'password',
          label: 'Password',
          placeholder: 'Password',
        }
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string; };

        try {
          const user = await fetchSignIn({ email, password });

        return user.data.data;
        } catch (error) {          
          console.log('[APIERROR]')
          console.dir(error);
          return null;
        }
      }
    })
  ],  
  session: {
    strategy: 'jwt',
  },  
}
})




declare module "next-auth" {
  interface Session {
    user: {} & DefaultSession['user'];
  }
}