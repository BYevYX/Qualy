'use server';
import bcrypt from 'bcryptjs';
import { ValidationError } from 'yup';

import { createUser } from './signupDB';
import { SignupError } from '../model/SignupError';
import { AuthActionObject } from 'src/features/shared/model/types';
import { sendEmail } from 'src/features/mail/api/send';
import { generateVerificationToken } from 'src/features/tokens/api/generate';
import { authGetUserByEmail } from 'src/utils/db/auth';
import { signupSchema } from 'src/utils/validateAuth';

const saltRounds = 10;

export async function registerAction(
  formData: FormData,
): Promise<AuthActionObject> {
  try {
    const formObject = Object.fromEntries(formData.entries());
    const { email, username, password } = await signupSchema.validate(
      formObject,
      { context: formObject },
    );

    const existingUser = await authGetUserByEmail(email);
    if (existingUser) {
      throw new SignupError('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await createUser(email, hashedPassword, username);

    const verificationToken = await generateVerificationToken(email);
    const { error } = await sendEmail(email, 'verifyEmail', {
      username,
      token: verificationToken.token,
    });

    if (error) {
      return { error: error.message };
    }

    return { success: 'Confirmation email sent!' };
  } catch (e) {
    if (e instanceof ValidationError) {
      return { error: e.message };
    }

    if (e instanceof SignupError) {
      return { error: e.message };
    }
    console.log(e);
    return { error: 'Something went wrong!' };
  }
}
