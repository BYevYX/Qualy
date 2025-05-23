import { getAccountByUserId, getUser } from '@qualy/front-server/index';
import { db } from 'src/db';

export const authGetUser = getUser.bind(null, db);
export const authGetAccountByUserId = getAccountByUserId.bind(null, db);
