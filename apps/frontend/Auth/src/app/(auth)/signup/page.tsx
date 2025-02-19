import Form from 'next/form';
import Link from 'next/link';
import { FC } from 'react';

import { Input } from '@qualy/front_share/client';
import { Button } from '@qualy/front_share/server';
import AuthErrorProvider from 'src/features/AuthErrors/ui/AuthErrorProvider';
import PasswordInput from 'src/features/common/ui/PasswordInput';

const Login: FC = () => {
  return (
    <AuthErrorProvider>
      <Form action={'l'} className="flex flex-col gap-15">
        <div className="flex flex-col gap-5">
          <Input
            name="username"
            placeholder="Username"
            className="border-amber-300 text-amber-600"
            inputStyle="underline"
          />
          <Input
            placeholder="Email"
            name="email"
            className="border-amber-300 text-amber-600"
            inputStyle="underline"
          />
          <PasswordInput name="password" placeholder="Password" />
          <PasswordInput name="verifyPassword" placeholder="Verify Password" />
        </div>
        <div className="flex flex-col gap-5">
          <Button type="submit">Create Account</Button>
          <span className="text-cyan-700">
            Already have an account?{' '}
            <Link className="text-amber-400 hover:text-amber-200" href="/login">
              Login
            </Link>
          </span>
        </div>
      </Form>
    </AuthErrorProvider>
  );
};

export default Login;
