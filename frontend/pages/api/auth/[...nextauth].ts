import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '../../../lib/mongodb';
import  User  from '@/models/User';
import bcrypt from 'bcrypt';
import type { JWT } from 'next-auth/jwt';
import type { Session } from 'next-auth';
import type { SessionStrategy } from 'next-auth';


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB();

        console.log('⬅️ Received credentials:', credentials);

        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          console.log('❌ User not found');
          return null;
        }

        console.log('🔍 User found:', user);
        console.log('🔑 Incoming password:', credentials?.password);
        console.log('🔑 Stored hash:', user.password);

        const isValid = await bcrypt.compare(credentials!.password, user.password);
        console.log('🔐 Compare result:', isValid);

        if (!isValid) {
          console.log('⛔ Wrong password for:', user.email);
          return null;
        }

        console.log('✅ Login success for:', user.email);

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
callbacks: {
  async jwt({ token, user }: { token: JWT; user?: any }) {
    if (user) {
      token.id = user.id;
      token.role = user.role;
    }
    return token;
  },
  async session({ session, token }: { session: Session; token: JWT }) {
    if (session.user) {
      session.user.id = token.id as string;
  
      // @ts-ignore
      session.user.role = token.role as string;
    }
    return session;
  },
},
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
