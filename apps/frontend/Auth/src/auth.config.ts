// we cant use db adapter in middleware so we need to create separate config for middleware
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';

import { signupSchema } from './utils/validateAuth';
import { LoginError } from './widjets/login/model/loginError';
import { authGetUserByEmail } from './widjets/share/api/shareDB';

export default {
  providers: [
    GitHub,
    Credentials({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
        email: {},
      },
      async authorize(credentials, request) {
        const validatedCredentials = await signupSchema.validate(credentials);
        const { email, password } = validatedCredentials;

        const user = await authGetUserByEmail(email);
        if (!user || !user.password) {
          throw new LoginError('Wrong password or email');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) return user;

        throw new LoginError('Wrong password or email');
      },
    }),
  ],
} satisfies NextAuthConfig;
