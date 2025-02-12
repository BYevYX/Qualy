import Form from 'next/form';
import Link from 'next/link';
import { FC } from 'react';

import { Button, Input } from '@qualy/front_share';

const Login: FC = () => {
  return (
    <Form action={'p'} className="flex flex-col gap-5">
      <Input placeholder="Email" name="email" />
      <Input placeholder="Password" name="password" />
      <Button type="submit">Login</Button>

      <Link href="/signup">Signup</Link>
    </Form>
  );
};

export default Login;
