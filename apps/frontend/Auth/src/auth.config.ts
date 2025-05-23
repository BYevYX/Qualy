// we cant use db adapter in middleware so we need to create separate config for middleware
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import VK from 'next-auth/providers/vk';
import Yandex from 'next-auth/providers/yandex';

// import { authGetUser } from './utils/db/auth';
// import { loginSchema } from './widjets/login';

// TODO: configure VK (now it isnt working)
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Google requires "offline" access_type to provide a `refresh_token`
      authorization: { params: { access_type: 'offline', prompt: 'consent' } },
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
        twoFactorCode: {},
      },

      // TODO: исправить нельзя использовать в edge
      // async authorize(credentials) {
      //   const validatedCredentials = await loginSchema.validate(credentials);
      //   const { email } = validatedCredentials;

      //   const user = await authGetUser({ email });
      //   return user;
      // },
    }),
  ],
} satisfies NextAuthConfig;
