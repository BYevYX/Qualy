'use client';
import Link from 'next/link';
import { FC } from 'react';

import { Button } from '@qualy/front_share/server';
import { useAuthErrors } from 'src/features/AuthErrors/model/AuthErrorsContext';
import AuthInput from 'src/features/common/ui/AuthInput';
import PasswordInput from 'src/features/common/ui/PasswordInput';
import { emailSchema } from 'src/utils/validate';

const LoginFormContent: FC = () => {
  const [errors] = useAuthErrors();

  const disabled = Object.values(errors).some((error) => error);

  return (
    <>
      <AuthInput
        schema={emailSchema}
        type="text"
        placeholder="Email"
        name="email"
      />
      <PasswordInput name="password" placeholder="Password" />
      <Button type="submit" disabled={disabled}>
        Login
      </Button>

      <span className="text-cyan-700">
        Don&apos;t have an account?{' '}
        <Link className="text-amber-400 hover:text-amber-200" href="/signup">
          Signup
        </Link>
      </span>
    </>
  );
};

export default LoginFormContent;
