export interface AuthActionObject {
  success?: string;
  error?: string;
}

export type LayoutParams = Promise<{ callbackUrl: string | null }>;

export type VerificationCode = 'noToken' | 'noUser' | 'expired' | 'ok';
