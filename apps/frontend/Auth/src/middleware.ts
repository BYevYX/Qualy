import NextAuth from 'next-auth';

import authConfig from './auth.config';
import {
  apiAuthPrefix,
  privateRoutes,
  authRoutes,
  AFTER_LOGIN_REDIRECT,
  NEED_LOGIN_REDIRECT,
} from 'src/shared';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(AFTER_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (isPrivateRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL(NEED_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }
  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
