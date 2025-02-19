import Form from 'next/form';
import { FC } from 'react';

import AuthErrorProvider from 'src/features/AuthErrors/ui/AuthErrorProvider';
import { loginSchema } from 'src/utils/validate';
import LoginFormContent from 'src/widjets/login/ui/LoginFormContent';

const Login: FC = () => {
  const action = async (formData: FormData) => {
    'use server';
    try {
      await loginSchema.validate({
        email: formData.get('email'),
        password: formData.get('password'),
      });
      console.log('success', formData.get('email'));
    } catch (error) {
      console.log('error', (error as Error).message);
    }
  };

  return (
    <AuthErrorProvider>
      <Form action={action} className="flex flex-col gap-5">
        <LoginFormContent />
      </Form>
    </AuthErrorProvider>
  );
};

export default Login;
