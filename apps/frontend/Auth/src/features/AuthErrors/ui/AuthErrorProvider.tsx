'use client';
import { useState, type FC, type PropsWithChildren } from 'react';

import { AuthErrors } from '../../common/model/types';
import AuthErrorsContext from 'src/features/AuthErrors/model/AuthErrorsContext';

const AuthErrorProvider: FC<PropsWithChildren> = ({ children }) => {
  const [errors, setErrors] = useState<AuthErrors>({});

  return (
    <AuthErrorsContext value={[errors, setErrors]}>
      {children}
    </AuthErrorsContext>
  );
};

export default AuthErrorProvider;
