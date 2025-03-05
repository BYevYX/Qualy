'use client';
import { FC } from 'react';

import { Input, useMegaForm } from '@qualy/front-share/client';
import PasswordInput from 'src/features/common/ui/PasswordInput';

const LoginFields: FC = () => {
  const { fieldsErrors } = useMegaForm();

  return (
    <div className="flex flex-col gap-5">
      <Input
        name="email"
        type="text"
        placeholder="Email"
        error={fieldsErrors.email}
        className="text-blue-600"
        inputStyle="underline"
      />
      <PasswordInput name="password" placeholder="Password" />
    </div>
  );
};

export default LoginFields;
