'use server';
import type { PrismaClient } from '@prisma/client';

export async function getUserByEmail(db: PrismaClient, email: string) {
  return await db.users.findUnique({
    where: {
      email,
    },
  });
}

export async function getUserById(db: PrismaClient, id: string) {
  return await db.users.findUnique({
    where: {
      id,
    },
  });
}
