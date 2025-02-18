import Form from 'next/form';
import Link from 'next/link';
import { FC } from 'react';

import { Button, Input } from '@qualy/front_share/server';
import PasswordInput from 'src/features/between/ui/PasswordInput';

const Login: FC = () => {
  return (
    <Form action={'p'} className="flex flex-col gap-5">
      <Input placeholder="Email" name="email" />
      <PasswordInput name="password" placeholder="Password" />
      <Button type="submit">Login</Button>

      <Link className="text-white" href="/signup">
        Signup
      </Link>
    </Form>
  );
};

export default Login;
