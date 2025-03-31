import { CredentialsSignin } from 'next-auth';

import { StatusType } from '@qualy/front-share/types';

export class TokenError extends CredentialsSignin {
  override code: string;
  public data: { email: string; error: string | Error | null };

  constructor(
    data: { email: string; error: string | Error | null },
    code: string,
    message?: string,
  ) {
    super(message);
    this.code = code;
    this.data = data;
  }
}

export class ActionError extends Error {
  public type: Exclude<StatusType, 'success'> = 'error';

  constructor(message: string, type?: Exclude<StatusType, 'success'>) {
    super(message);

    if (type) {
      this.type = type;
    }
  }
}

export class NotVerifyEmailYetError extends TokenError {
  constructor(
    data: { email: string; error: string | Error | null },
    message?: string,
  ) {
    super(data, 'not_verifyed_email_yet', message);
  }
}
