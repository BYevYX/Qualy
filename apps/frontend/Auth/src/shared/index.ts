export { apiAuthPrefix, DOMAIN } from './routes/prefixes';
export {
  privateRoutes,
  authRoutes,
  AUTH_ERROR_URL,
  RESET_PASSWORD_URL,
  EMAIL_VERIFICATION_URL,
  NEED_LOGIN_REDIRECT,
  AFTER_LOGIN_REDIRECT,
} from './routes/routes';

export { ActionError } from './model/errors';
export type { AuthActionObject, LayoutParams } from './model/types';

export {
  emailSchema,
  passwordSchema,
  verifyPasswordSchema,
  usernameSchema,
  twoFactorCodeSchema,
} from './model/validateInputs';

export { AuthMultiChoose } from './ui/AuthMultiChoose';
export { ErrorMessage } from './ui/ErrorMessage';
export { PasswordInput } from './ui/PasswordInput';

export { getFullUrl, createQueryStringAndPath } from './lib/urls/urlsBuilders';
