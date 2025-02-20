export interface AuthErrors {
  username?: string;
  email?: string;
  password?: string;
  verifyPassword?: string;
  [key: string]: string | undefined | null;
}
