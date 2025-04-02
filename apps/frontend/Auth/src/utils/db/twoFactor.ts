import { db } from 'src/db';

export const getTwoFactorTokenByEmail = async (email: string) => {
  const twoFactorToken = await db.twoFactorToken.findUnique({
    where: {
      email,
    },
  });
  return twoFactorToken;
};

export const getTwoFactorTokenByToken = async (token: string) => {
  const twoFactorToken = await db.twoFactorToken.findUnique({
    where: {
      token,
    },
  });
  return twoFactorToken;
};

export const deleteTwoFactorToken = async (token: string) => {
  await db.twoFactorToken.delete({
    where: {
      token,
    },
  });
};

export const getTwoFactorConfirmation = async (userId: string) => {
  const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
    where: {
      userId,
    },
  });
  return twoFactorConfirmation;
};

export const deleteTwoFactorConfirmation = async (userId: string) => {
  await db.twoFactorConfirmation.delete({
    where: {
      userId,
    },
  });
};
