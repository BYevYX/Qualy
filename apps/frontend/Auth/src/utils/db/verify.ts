import { db } from 'src/db';

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
      email,
    },
  });
};

export const deleteVerificationToken = async (token: string) => {
  await db.verificationToken.delete({
    where: {
      token,
    },
  });
};
