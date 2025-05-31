'use client';
import { MultiButtons } from '@qualy/front-share/client';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

export const AuthMultiChoose: FC = () => {
  const path = usePathname();
  return (
    <MultiButtons
      className="absolute top-10 right-20"
      variant="withLines"
      buttonsData={[
        {
          id: 'login-btn',
          text: 'Login',
          href: '/auth/login',
          active: path === '/auth/login',
        },
        {
          id: 'signup-btn',
          text: 'Signup',
          href: '/auth/signup',
          active: path === '/auth/signup',
        },
      ]}
    />
  );
};
