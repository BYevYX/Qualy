'use server';

import bcrypt from 'bcrypt';

import { createUser } from './signupDB';
import { getUserByEmail } from '@qualy/front-server';
import { db } from 'src/db';
import { signupSchema } from 'src/utils/validateAuth';

const saltRounds = 10;

export async function register(formData: FormData) {
  const validatedData = await signupSchema.validate(formData);
  const { email, username, password } = validatedData;

  const existingUser = await getUserByEmail(db, email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await createUser(email, hashedPassword, username);
}
