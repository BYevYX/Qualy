import crypto from 'crypto';
import { v4 } from 'uuid';

import { db } from 'src/db';
import {
  deleteResetPasswordToken,
  getResetPasswordTokenByEmail,
} from 'src/utils/db/password';
import {
  deleteTwoFactorConfirmation,
  deleteTwoFactorToken,
  getTwoFactorConfirmation,
  getTwoFactorToken,
} from 'src/utils/db/twoFactor';
import {
  deleteVerificationToken,
  getVerificationTokenByEmail,
} from 'src/utils/db/verify';

const minute = 1000 * 60;
const HOUR = minute * 60;

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

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + minute * 10);

  const existingToken = await getTwoFactorToken(email);

  if (existingToken) {
    await deleteTwoFactorToken(existingToken.email);
  }

  return await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};

export const generateTwoFactorConfirmation = async (userId: string) => {
  const existingConfirmation = await getTwoFactorConfirmation(userId);

  if (existingConfirmation) {
    await deleteTwoFactorConfirmation(existingConfirmation.userId);
  }

  return await db.twoFactorConfirmation.create({
    data: {
      userId,
    },
  });
};
