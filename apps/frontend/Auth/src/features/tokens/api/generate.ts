import { v4 } from 'uuid';

import { db } from 'src/db';
import {
  deleteResetPasswordToken,
  getResetPasswordTokenByEmail,
} from 'src/utils/db/password';
import {
  deleteVerificationToken,
  getVerificationTokenByEmail,
} from 'src/utils/db/verify';

const HOUR = 1000 * 60 * 60;

export const generateVerificationToken = async (email: string) => {
  const token = v4();
  const expires = new Date(new Date().getTime() + HOUR);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await deleteVerificationToken(existingToken.token);
  }

  return await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};

export const generateResetPasswordToken = async (email: string) => {
  const token = v4();
  const expires = new Date(new Date().getTime() + HOUR);

  const existingToken = await getResetPasswordTokenByEmail(email);

  if (existingToken) {
    await deleteResetPasswordToken(existingToken.token);
  }

  return await db.resetPasswordToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};
