import { getUserByEmail, getUserById } from '@qualy/front-server';
import { db } from 'src/db';

export const authGetUserByEmail = getUserByEmail.bind(null, db);
export const authGetUserById = getUserById.bind(null, db);
