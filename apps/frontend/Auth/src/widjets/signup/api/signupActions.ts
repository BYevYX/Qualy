'use server';
import bcrypt from 'bcryptjs';
import { ValidationError } from 'yup';

import { createUser } from './signupDB';
import { SignupError } from '../model/SignupError';
import { signupSchema } from 'src/utils/validateAuth';
import { authGetUserByEmail } from 'src/widjets/share/api/shareDB';
import { AuthActionObject } from 'src/widjets/share/model/types';

const saltRounds = 10;

export async function registerAction(
  formData: FormData,
): Promise<AuthActionObject> {
  try {
    const validatedData = await signupSchema.validate(
      Object.fromEntries(formData.entries()),
    );
    const { email, username, password } = validatedData;

    const existingUser = await authGetUserByEmail(email);
    if (existingUser) {
      throw new SignupError('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await createUser(email, hashedPassword, username);

    return { succes: true };
  } catch (e) {
    if (e instanceof ValidationError) {
      return { succes: false, error: e.message };
    }

    if (e instanceof SignupError) {
      return { succes: false, error: e.message };
    }
    return { succes: false, error: 'Something went wrong!' };
  }
}
