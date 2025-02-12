import Form from 'next/form';
import Link from 'next/link';
import { FC } from 'react';

import { Button, Input } from '@qualy/front_share';

const Login: FC = () => {
  return (
    <Form action={'l'} className="flex flex-col gap-5">
      <Input placeholder="Email" name="email" inputStyle="underline" />
      <Input placeholder="Password" name="password" inputStyle="withGlow" />
      <Input placeholder="Verify Password" name="verify_password" />
      <Button type="submit">Create Account</Button>

      <Link href="/login">Login</Link>
    </Form>
  );
};

export default Login;
