import { db } from 'src/db';

export const getTwoFactorToken = async (email: string) => {
  const twoFactorToken = await db.twoFactorToken.findUnique({
    where: {
      email,
    },
  });
  return twoFactorToken;
};

export const deleteTwoFactorToken = async (email: string) => {
  await db.twoFactorToken.delete({
    where: {
      email,
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
