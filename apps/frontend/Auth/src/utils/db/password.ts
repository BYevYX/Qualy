import { EmailOrToken } from './dbUtils.types';
import { db } from 'src/db';

export const getResetPasswordToken = async (where: EmailOrToken) => {
  const resetPasswordToken = await db.resetPasswordToken.findUnique({
    where,
  });
  return resetPasswordToken;
};

export const updatePassword = async (userId: string, newPassword: string) => {
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      password: newPassword,
    },
  });
};

export const deleteResetPasswordToken = async (token: string) => {
  await db.resetPasswordToken.delete({
    where: {
      token,
    },
  });
};
