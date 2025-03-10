import { userRole } from '@prisma/client';
import type { DefaultSession } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

import { OAuthProvidersType } from '@qualy/front-server/types';

export type ExtendedUser = DefaultSession['user'] & {
  role: userRole;
  provider?: OAuthProvidersType;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
    error: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: userRole;
    provider?: OAuthProvidersType;
  }
}
