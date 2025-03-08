export interface AuthActionObject {
  succes: boolean;
  error?: string;
}

export type LayoutParams = Promise<{ callbackUrl: string | null }>;
