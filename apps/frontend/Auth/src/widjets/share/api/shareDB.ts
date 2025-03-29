import {
  getAccountByUserId,
  getUserByEmail,
  getUserById,
} from '@qualy/front-server/index';
import { db } from 'src/db';

export const authGetUserByEmail = getUserByEmail.bind(null, db);
export const authGetUserById = getUserById.bind(null, db);

export const authGetAccountByUserId = getAccountByUserId.bind(null, db);

export const verifyUserEmailById = async (id: string) => {
  await db.user.update({
    where: {
      id,
    },
    data: {
      emailVerified: new Date(),
    },
  });
};

export const verifyUserEmailByEmail = async (email: string) => {
  await db.user.update({
    where: {
      email,
    },
    data: {
      emailVerified: new Date(),
    },
  });
};

export const getVerificationTokenByEmail = async (email: string) => {
  const verificationToken = await db.verificationToken.findUnique({
    where: {
      email,
    },
  });
  return verificationToken;
};

export const getVerificationTokenByToken = async (token: string) => {
  const verificationToken = await db.verificationToken.findUnique({
    where: {
      token,
    },
  });
  return verificationToken;
};
