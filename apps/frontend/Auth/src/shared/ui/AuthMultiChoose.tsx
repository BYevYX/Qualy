'use client';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { MultiButtons } from '@qualy/front-share/client';

export const AuthMultiChoose: FC = () => {
  const path = usePathname();
  return (
    <MultiButtons
      className="absolute top-10 right-20"
      variant="withLines"
      buttonsData={[
        {
          text: 'Login',
          href: '/auth/login',
          active: path === '/auth/login',
        },
        {
          text: 'Signup',
          href: '/auth/signup',
          active: path === '/auth/signup',
        },
      ]}
    />
  );
};
