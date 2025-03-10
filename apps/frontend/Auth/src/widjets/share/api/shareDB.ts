import {
  getAccountByUserId,
  getUserByEmail,
  getUserById,
} from '@qualy/front-server/index';
import { db } from 'src/db';

export const authGetUserByEmail = getUserByEmail.bind(null, db);
export const authGetUserById = getUserById.bind(null, db);

export const authGetAccountByUserId = getAccountByUserId.bind(null, db);

export const verifyUserEmailBD = async (id: string) => {
  await db.user.update({
    where: {
      id,
    },
    data: {
      emailVerified: new Date(),
    },
  });
};
