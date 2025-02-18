import Form from 'next/form';
import Link from 'next/link';
import { FC } from 'react';

import { Button, Input } from '@qualy/front_share/server';
import PasswordInput from 'src/features/between/ui/PasswordInput';

const Login: FC = () => {
  return (
    <Form action={'l'} className="flex flex-col gap-5">
      <Input placeholder="Email" name="email" inputStyle="underline" />
      <PasswordInput name="password" placeholder="Password" />
      <PasswordInput name="verify_password" placeholder="Verify Password" />

      <Button type="submit">Create Account</Button>
      <Link className="text-white" href="/login">
        Login
      </Link>
    </Form>
  );
};

export default Login;
