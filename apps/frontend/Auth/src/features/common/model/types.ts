export interface AuthErrors {
  username?: Error;
  email?: Error;
  password?: Error;
  verifyPassword?: Error;
  [key: string]: Error | undefined | null;
}
