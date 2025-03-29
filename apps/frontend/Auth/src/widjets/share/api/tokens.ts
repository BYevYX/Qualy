'use server';
import { v4 } from 'uuid';

import {
  authGetUserByEmail,
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
  verifyUserEmailByEmail,
} from './shareDB';
import { VerificationCode } from '../model/types';
import { StatusType } from '@qualy/front-share/types';
import { db } from 'src/db';
import { sendEmail } from 'src/widjets/mail/api/send';

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

export const checkVerificationToken = async (
  token: string,
): Promise<{ status: StatusType; code: VerificationCode }> => {
  const verificationToken = await getVerificationTokenByToken(token);

  if (!verificationToken) {
    return {
      status: 'error',
      code: 'noToken',
    };
  }

  if (verificationToken.expires < new Date()) {
    const user = await authGetUserByEmail(verificationToken.email);
    const newVerificationToken = await generateVerificationToken(
      verificationToken.email,
    );

    if (!user || !user.name) {
      return {
        status: 'error',
        code: 'noUser',
      };
    }

    await sendEmail(user.email, user?.name, newVerificationToken.token);
    return {
      status: 'info',
      code: 'expired',
    };
  }

  await verifyUserEmailByEmail(verificationToken.email);
  await db.verificationToken.delete({
    where: {
      token,
    },
  });

  return { status: 'success', code: 'ok' };
};
