// 'use client';
import { useCallback } from 'react';

import { Toggle } from '@qualy/front_share';

import './global.css';

export const metadata = {
  title: 'Auth',
  description: 'Login and Signup',
};

export default function RootLayout({
  children,
  login,
  signup,
}: {
  children: React.ReactNode;
  login: React.ReactNode;
  signup: React.ReactNode;
}) {
  // const [isLoging, setIsLoging] = useState(true);

  // const handleToggle = useCallback(() => {
  //   // setIsLoging((prev) => !prev);

  // }, []);

  return (
    <html lang="en">
      <body>
        <main className="b flex h-full flex-col items-center justify-center bg-blue-400">
          {children}
          <div className="space-y-6">{true ? login : signup}</div>
          <Toggle
            firstButonText="Login"
            secondButonText="Signup"
            handleToggle={true}
          />
        </main>
      </body>
    </html>
  );
}
