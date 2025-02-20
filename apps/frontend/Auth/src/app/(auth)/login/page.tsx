import Form from 'next/form';
import { FC } from 'react';

import LoginFormContent from 'src/widjets/login/ui/LoginFormContent';

const Login: FC = () => {
  return (
    <Form action={'p'} className="flex flex-col gap-5">
      <LoginFormContent />
    </Form>
  );
};

export default Login;
