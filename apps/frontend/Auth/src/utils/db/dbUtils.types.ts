import { Email } from '@qualy/front-server/types';

export type EmailOrToken =
  | Email
  | {
      token: string;
    };
