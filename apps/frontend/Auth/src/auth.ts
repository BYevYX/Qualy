import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import type { Provider } from 'next-auth/providers';

import authConfig from './auth.config';
import { db } from './db';
import { refreshTokenRotation } from './utils/RefreshTokens';
import {
  authGetUserById,
  verifyUserEmailBD,
} from './widjets/share/api/shareDB';
import { OAuthProvidersType } from '@qualy/front-server/types';

export const providerMap = (authConfig.providers as Provider[])
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== 'credentials');

// TODO: maybe add signin callback to redirect if email not verified (а не кидать ошибку) or smt else
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (!token.sub) return token;

      const existingUser = await authGetUserById(token.sub);
      if (!existingUser) return token;

      return {
        ...token,
        role: existingUser.role,
        provider: account?.provider as OAuthProvidersType,
      };
    },

    async session({ session, token }) {
      if (!session.user) return session;

      if (token.sub) {
        session.user.id = token.sub;
      }
      if (token.role) {
        session.user.role = token.role;
      }
      session.user.provider = token.provider;

      await refreshTokenRotation(session);

      return session;
    },
  },
  events: {
    async linkAccount({ user }) {
      if (!user.id) throw new Error('User ID not found');
      await verifyUserEmailBD(user.id);
    },
  },
});
