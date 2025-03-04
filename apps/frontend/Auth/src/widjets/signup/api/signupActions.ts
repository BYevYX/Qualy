'use server';

import bcrypt from 'bcryptjs';
import { ValidationError } from 'yup';

import { createUser } from './signupDB';
import { getUserByEmail } from '@qualy/front-server';
import { db } from 'src/db';
import { signupSchema } from 'src/utils/validateAuth';
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

    const existingUser = await getUserByEmail(db, email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await createUser(email, hashedPassword, username);

    return { succes: true };
  } catch (e) {
    if (e instanceof ValidationError) {
      return { succes: false, error: e.message };
    }
    console.error(e);
    return { succes: false, error: 'Something went wrong!' };
  }
}
