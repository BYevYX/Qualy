'use client';
import { FC } from 'react';

import { Input, useMegaForm } from '@qualy/front-share/client';
import PasswordInput from 'src/features/common/ui/PasswordInput';

interface SignupFieldsProps {
  formError?: string;
}

const SignupFields: FC<SignupFieldsProps> = ({ formError }) => {
  const { controlRegister } = useMegaForm();

  return (
    <div className="flex flex-col gap-5">
      <Input
        {...controlRegister('username')}
        placeholder="Username"
        className="text-blue-600"
        inputStyle="underline"
      />
      <Input
        {...controlRegister('email')}
        placeholder="Email"
        className="text-blue-600"
        inputStyle="underline"
      />
      <PasswordInput name="password" placeholder="Password" />
      <PasswordInput name="verifyPassword" placeholder="Verify Password" />
    </div>
  );
};

export default SignupFields;
