'use server';
import { db } from 'src/db';

export async function createUser(
  email: string,
  password: string,
  username: string,
) {
  const user = await db.user.create({
    data: {
      email,
      password,
      name: username,
    },
  });

  return user;
}
