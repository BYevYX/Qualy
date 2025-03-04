'use client';
import { FC } from 'react';

import { Input, useMegaForm } from '@qualy/front-share/client';
import PasswordInput from 'src/features/common/ui/PasswordInput';

interface SignupFieldsProps {
  formError?: string;
}

const SignupFields: FC<SignupFieldsProps> = ({ formError }) => {
  const { fieldsErrors } = useMegaForm();

  return (
    <div className="flex flex-col gap-5">
      <Input
        name="username"
        placeholder="Username"
        className="text-blue-600"
        inputStyle="underline"
        error={fieldsErrors.username}
      />
      <Input
        name="email"
        placeholder="Email"
        className="text-blue-600"
        inputStyle="underline"
        error={fieldsErrors.email}
      />
      <PasswordInput name="password" placeholder="Password" />
      <PasswordInput name="verifyPassword" placeholder="Verify Password" />
    </div>
  );
};

export default SignupFields;
