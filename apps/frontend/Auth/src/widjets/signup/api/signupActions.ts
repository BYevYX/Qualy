'use server';
import bcrypt from 'bcryptjs';
import { ValidationError } from 'yup';

import { createUser } from './signupDB';
import { SignupError } from '../model/SignupError';
import { signupSchema } from 'src/utils/validateAuth';
import { sendEmail } from 'src/widjets/mail/api/send';
import { authGetUserByEmail } from 'src/widjets/share/api/shareDB';
import { generateVerificationToken } from 'src/widjets/share/api/tokens';
import { AuthActionObject } from 'src/widjets/share/model/types';

const saltRounds = 10;

export async function registerAction(
  formData: FormData,
): Promise<AuthActionObject> {
  try {
    const { email, username, password } = await signupSchema.validate(
      Object.fromEntries(formData.entries()),
    );

    const existingUser = await authGetUserByEmail(email);
    if (existingUser) {
      throw new SignupError('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await createUser(email, hashedPassword, username);

    const verificationToken = await generateVerificationToken(email);
    const { error } = await sendEmail(email, username, verificationToken.token);

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
