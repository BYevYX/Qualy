// we cant use db adapter in middleware so we need to create separate config for middleware
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import VK from 'next-auth/providers/vk';
import Yandex from 'next-auth/providers/yandex';

import { loginSchema } from './utils/validateAuth';
import { authGetUserByEmail } from './widjets/share/api/shareDB';

// TODO: configure VK (now it isnt working)
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Yandex({
      clientId: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_CLIENT_SECRET,
    }),
    VK({
      clientId: process.env.VK_CLIENT_ID,
      clientSecret: process.env.VK_CLIENT_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        password: {},
        email: {},
      },
      async authorize(credentials, request) {
        const validatedCredentials = await loginSchema.validate(credentials);
        const { email, password } = validatedCredentials;

        const user = await authGetUserByEmail(email);
        if (!user || !user.password) {
          return null;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) return user;

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
