import { Email, EmailOrId } from '@qualy/front-server/types';

import { EmailOrToken } from './dbUtils.types';
import { db } from 'src/db';

export const getVerificationToken = async (where: EmailOrToken) => {
  const verificationToken = await db.verificationToken.findUnique({
    where,
  });
  return verificationToken;
};

function isEmail(where: EmailOrId): where is Email {
  return Object.hasOwn(where, 'email');
}

export const verifyUserEmail = async (where: EmailOrId) => {
  const data: {
    emailVerified: Date;
    email?: string;
  } = {
    emailVerified: new Date(),
  };

  if (isEmail(where)) {
    data.email = where.email;
  }

  await db.user.update({
    where,
    data,
  });
};

export const deleteVerificationToken = async (token: string) => {
  await db.verificationToken.delete({
    where: {
      token,
    },
  });
};
