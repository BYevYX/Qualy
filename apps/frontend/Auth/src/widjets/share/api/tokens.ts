import { v4 } from 'uuid';

import { getVerificationTokenByEmail } from './shareDB';
import { db } from 'src/db';

const HOUR = 1000 * 60 * 60;

export const generateVerificationToken = async (email: string) => {
  const token = v4();
  const expires = new Date(new Date().getTime() + HOUR);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        token: existingToken.token,
      },
    });
  }

  return await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};
