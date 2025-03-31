import { db } from 'src/db';

export const getResetPasswordTokenByEmail = async (email: string) => {
  const resetPasswordTokenToken = await db.resetPasswordToken.findUnique({
    where: {
      email,
    },
  });
  return resetPasswordTokenToken;
};

export const getResetPasswordTokenByToken = async (token: string) => {
  const resetPasswordToken = await db.resetPasswordToken.findUnique({
    where: {
      token,
    },
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
