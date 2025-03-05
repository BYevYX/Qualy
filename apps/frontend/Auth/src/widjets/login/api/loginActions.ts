'use server';
import { AuthError } from 'next-auth';

import { signIn } from 'src/auth';
import { AFTER_LOGIN_REDIRECT } from 'src/routes';
import { AuthActionObject } from 'src/widjets/share/model/types';

export async function loginAction(data: FormData): Promise<AuthActionObject> {
  const email = data.get('email');
  const password = data.get('password');

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: AFTER_LOGIN_REDIRECT,
    });

    return { succes: true };
  } catch (e) {
    const errorObj = { succes: false };
    console.log('===>', e);

    if (e instanceof AuthError) {
      switch (e.type) {
        case 'CredentialsSignin':
          return { ...errorObj, error: 'Invalid credentials!' };
        default:
          return { ...errorObj, error: 'Something went wrong!' };
      }
    }
    throw e;
  }
}
