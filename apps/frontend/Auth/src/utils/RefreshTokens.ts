import { Auth } from '@vkid/sdk';
// eslint-disable-next-line import/named
import { Session } from 'next-auth';

import { OAuthProvidersType } from '@qualy/front-server/types';
import { db } from 'src/db';
import { authGetAccountByUserId } from 'src/widjets/share/api/shareDB';

// TODO: test it and explore VKID SDK
// TODO: handle RefreshTokenError (принудительно вызвать авторизовать)
export async function refreshTokenRotation(session: Session) {
  const {
    user: { id, provider },
  } = session;
  try {
    if (!id) throw new Error('No user id! Can not rotate Refresh Token');

    const [account] = await authGetAccountByUserId(id, provider);
    if ((account.expires_at ?? 0) * 1000 < Date.now()) {
      // If the access token has expired, try to refresh it
      // https://accounts.google.com/.well-known/openid-configuration
      // We need the `token_endpoint`.

      if (!account.refresh_token)
        throw new Error('No user id! Can not rotate Refresh Token');
      if (!provider)
        throw new Error('No Provider! Maybe you dont have an account');

      const newTokens = await fetchTokens(account.refresh_token, provider);

      await db.account.update({
        data: {
          access_token: newTokens.access_token,
          expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
          refresh_token: newTokens.refresh_token ?? account.refresh_token,
        },
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId: account.providerAccountId,
          },
        },
      });
    }
  } catch (error) {
    console.error('Error refreshing access_token', error);
    // If we fail to refresh the token, return an error so we can handle it on the page
    session.error = 'RefreshTokenError';
  }
}

async function fetchTokens(refreshToken: string, provider: OAuthProvidersType) {
  let response: Response;

  switch (provider) {
    case 'google':
      response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body: new URLSearchParams({
          client_id: process.env.AUTH_GOOGLE_ID as string,
          client_secret: process.env.AUTH_GOOGLE_SECRET as string,
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      });
      break;

    case 'github':
      throw new Error('GitHub требует повторной аутентификации');

    case 'yandex':
      response = await fetch('https://oauth.yandex.com/', {
        method: 'POST',
        body: new URLSearchParams({
          client_id: process.env.AUTH_YANDEX_ID as string,
          client_secret: process.env.AUTH_YANDEX_SECRET as string,
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      });
      break;

    case 'vk':
      return await Auth.refreshToken(
        refreshToken,
        process.env.VK_DEVICE_ID as string,
      );
  }

  const tokensOrError = await response.json();
  if (!tokensOrError.ok) throw tokensOrError;

  return tokensOrError as {
    access_token: string;
    expires_in: number;
    refresh_token?: string;
  };
}
