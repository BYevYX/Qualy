export interface AuthActionObject {
  succes?: string;
  error?: string;
}

export type LayoutParams = Promise<{ callbackUrl: string | null }>;
