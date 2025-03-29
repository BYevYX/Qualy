'use server';
import { AuthError } from 'next-auth';

import { signIn } from 'src/auth';
import { AFTER_LOGIN_REDIRECT } from 'src/routes';
import { NotVerifyEmailYetError } from 'src/widjets/share/model/errors';
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

    return { success: 'You entering!' };
  } catch (e) {
    if (e instanceof NotVerifyEmailYetError) {
      if (e.data.error) {
        return {
          error:
            e.data.error instanceof Error ? e.data.error.message : e.data.error,
        };
      }
      return { success: 'Confirmation email sent!' };
    }

    if (e instanceof AuthError) {
      switch (e.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }
    throw e;
  }
}
