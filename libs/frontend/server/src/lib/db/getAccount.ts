'use server';
import type { PrismaClient } from '@prisma/client';

import type { OAuthProvidersType } from '../Types/OAuthProviders';

export async function getAccountByUserId(
  db: PrismaClient,
  userId: string,
  provider?: OAuthProvidersType,
) {
  if (provider) {
    return await db.account.findMany({
      where: { userId, provider },
    });
  }

  return await db.account.findMany({
    where: { userId },
  });
}
