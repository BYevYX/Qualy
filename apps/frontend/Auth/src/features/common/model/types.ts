export interface AuthActionObject {
  success?: string;
  error?: string;
}

export type LayoutParams = Promise<{ callbackUrl: string | null }>;
