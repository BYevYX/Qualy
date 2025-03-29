import { CredentialsSignin } from 'next-auth';

export class NotVerifyEmailYetError extends CredentialsSignin {
  override code = 'not_verifyed_email_yet';

  constructor(public data: { email: string; error: string | Error | null }) {
    super();
  }
}
