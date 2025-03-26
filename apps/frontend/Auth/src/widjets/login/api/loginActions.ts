'use server';
import { AuthError } from 'next-auth';

import { signIn } from 'src/auth';
import { AFTER_LOGIN_REDIRECT } from 'src/routes';
import { sendEmail } from 'src/widjets/mail/api/send';
import { generateVerificationToken } from 'src/widjets/share/api/tokens';
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

    return { succes: 'ok' };
  } catch (e) {
    if (e instanceof NotVerifyEmailYetError) {
      const verificationToken = await generateVerificationToken(e.email);
      const { error } = await sendEmail(e.email, verificationToken.token);

      if (error) {
        return { error: error.message };
      }
      return { succes: 'Confirmation email sent!' };
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
