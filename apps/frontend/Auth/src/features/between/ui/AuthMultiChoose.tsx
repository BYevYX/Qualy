'use client';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { MultiButtons } from '@qualy/front_share/client';

const AuthMultiChoose: FC = () => {
  const path = usePathname();

  return (
    <MultiButtons
      className="absolute top-10 right-20"
      buttonsData={[
        {
          text: 'Login',
          href: '/login',
          active: path === '/login',
        },
        {
          text: 'Signup',
          href: '/signup',
          active: path === '/signup',
        },
      ]}
    />
  );
};

export default AuthMultiChoose;
