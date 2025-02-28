'use server';
import { AuthError } from 'next-auth';

import { signIn } from 'src/auth';
import { AFTER_LOGIN_REDIRECT } from 'src/routes';

export default async function login(data: FormData) {
  const email = data.get('email');
  const password = data.get('password');

  try {
    return await signIn('credentials', {
      email,
      password,
      redirectTo: AFTER_LOGIN_REDIRECT,
    });
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case 'CredentialsSignin':
          throw new Error('Invalid credentials!');
        default:
          return new Error('Something went wrong!');
      }
    }

    throw e;
  }
}
