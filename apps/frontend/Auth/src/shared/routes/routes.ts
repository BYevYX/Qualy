import { authPrefix } from './prefixes';

// Pages URLS
const LOGIN_URL = authPrefix + '/login';
const SIGNUP_URL = authPrefix + '/signup';
export const AUTH_ERROR_URL = authPrefix + '/error';
export const EMAIL_VERIFICATION_URL = authPrefix + '/verify-email';
export const RESET_PASSWORD_URL = authPrefix + '/new-password';

// Group URLS
export const privateRoutes: string[] = [];
export const authRoutes = [LOGIN_URL, SIGNUP_URL, AUTH_ERROR_URL];

// Redirects URLS
export const AFTER_LOGIN_REDIRECT = '/';
export const NEED_LOGIN_REDIRECT = LOGIN_URL;
