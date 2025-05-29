import { Button } from '@qualy/front-share/server';
import Form from 'next/form';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { FC, ReactNode } from 'react';
import { FaGithub, FaVk, FaYandex } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { providerMap, signIn } from 'src/auth';
import { LayoutParams, AFTER_LOGIN_REDIRECT, AUTH_ERROR_URL } from 'src/shared';

const baseIconProps = { className: 'h-7 w-7' };
const icons: Record<string, ReactNode> = {
  GitHub: <FaGithub {...baseIconProps} />,
  Google: <FcGoogle {...baseIconProps} />,
  Yandex: <FaYandex {...baseIconProps} color="oklch(0.577 0.245 27.325)" />,
  VK: <FaVk {...baseIconProps} color="#155dfc" />,
};

interface OauthProps {
  params: LayoutParams;
}

const Oauth: FC<OauthProps> = async ({ params }) => {
  const { callbackUrl } = await params;

  return (
    <article className="mt-4">
      <div className="flex items-center gap-4 text-white before:flex-1 before:border-b before:border-solid after:flex-1 after:border-b after:border-solid">
        <span className="whitespace-nowrap">Or continue with</span>
      </div>

      <div className="mt-2 flex gap-2">
        {Object.values(providerMap).map((provider) => (
          <Form
            key={provider.id}
            action={async () => {
              'use server';
              try {
                await signIn(provider.id, {
                  redirectTo: callbackUrl || AFTER_LOGIN_REDIRECT,
                });
              } catch (error) {
                // Signin can fail for a number of reasons, such as the user
                // not existing, or the user not having the correct role.
                // In some cases, you may want to redirect to a custom error
                if (error instanceof AuthError) {
                  console.error(error);
                  return redirect(`${AUTH_ERROR_URL}?error=${error.type}`);
                }

                // Otherwise if a redirects happens Next.js can handle it
                // so you can just re-thrown the error and let Next.js handle it.
                // Docs:
                // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                throw error;
              }
            }}
          >
            <Button
              variant="icon"
              aria-label={`enter using ${provider.name}`}
              type="submit"
              className={
                'flex h-10 w-15 items-center justify-center hover:bg-gray-600'
              }
            >
              {icons[provider.name] || provider.name}
            </Button>
          </Form>
        ))}
      </div>
    </article>
  );
};

export default Oauth;
