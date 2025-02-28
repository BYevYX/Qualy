'use client';
import { FC, useCallback, useState } from 'react';

import { Toggle } from '@qualy/front-share/client';

interface Props {
  login: React.ReactNode;
  signup: React.ReactNode;
}

const AuthToggle: FC<Props> = ({ login, signup }) => {
  const [isLoging, setIsLoging] = useState(true);

  const handleToggle = useCallback(() => {
    setIsLoging((prev) => !prev);
  }, []);

  return (
    <>
      <div className="space-y-6">{isLoging ? login : signup}</div>
      <Toggle
        firstButonText="Login"
        secondButonText="Signup"
        handleToggle={handleToggle}
      />
    </>
  );
};

export default AuthToggle;
