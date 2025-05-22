'use server';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

import { signIn } from 'src/auth';
import { sendEmail } from 'src/features/mail/api/send';
import { AuthActionObject } from 'src/features/shared/model/types';
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from 'src/features/tokens/api/generate';
import { AFTER_LOGIN_REDIRECT } from 'src/shared';
import { authGetUserByEmail } from 'src/utils/db/auth';
import {
  deleteTwoFactorToken,
  getTwoFactorToken,
} from 'src/utils/db/twoFactor';
import { loginSchema } from 'src/utils/validateAuth';

export async function loginAction(data: FormData): Promise<AuthActionObject> {
  try {
    const validatedCredentials = await loginSchema.validate(
      Object.fromEntries(data.entries()),
    );
    const { email, password, twoFactorCode } = validatedCredentials;

    const user = await authGetUserByEmail(email);
    if (!user || !user.password) {
      return { error: 'Invalid credentials!' };
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return { error: 'Invalid credentials!' };
    }

    //**************** EMAIL CONFIRMATION FLOW ****************//
    if (!user.emailVerified) {
      const verificationToken = await generateVerificationToken(email);
      const { error } = await sendEmail(email, 'verifyEmail', {
        username: user.name as string,
        token: verificationToken.token,
      });

      if (error) return { error: error.message };
      return { success: 'Confirmation email sent!' };
    }

    //********************* TWO FACTOR FLOW *********************//
    if (user.isTwoFactorEnabled) {
      if (twoFactorCode) {
        const existingTwoFactorToken = await getTwoFactorToken(email);

        if (
          !existingTwoFactorToken ||
          existingTwoFactorToken.token !== twoFactorCode
        ) {
          return { error: 'Invalid Token!' };
        }

        if (existingTwoFactorToken.expires < new Date()) {
          return { error: 'Token expired!' };
        }

        await deleteTwoFactorToken(email);

        // can use this model to control 2FA
        // await generateTwoFactorConfirmation(user.id);
      } else {
        const twoFactorToken = await generateTwoFactorToken(email);

        const { error } = await sendEmail(email, 'twoFactor', {
          username: user.name as string,
          token: twoFactorToken.token,
        });
        if (error) return { error: error.message };
        return { success: '2FA' };
      }
    }

    await signIn('credentials', {
      email,
      password,
      redirectTo: AFTER_LOGIN_REDIRECT,
    });

    return { success: 'You entering!' };
  } catch (e) {
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
