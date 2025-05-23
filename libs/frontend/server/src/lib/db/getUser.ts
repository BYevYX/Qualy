'use server';
import type { PrismaClient } from '@prisma/client';

import { EmailOrId } from '../Types/db';

export async function getUser(db: PrismaClient, where: EmailOrId) {
  return await db.user.findUnique({
    where,
  });
}
