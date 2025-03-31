'use client';
import { FC } from 'react';
import { CiCircleInfo } from 'react-icons/ci';

import { Input, Tooltip, useMegaForm } from '@qualy/front-share/client';
import { Button } from '@qualy/front-share/server';
import PasswordInput from 'src/features/common/ui/PasswordInput';

interface LofinFieldsProps {
  formAction: string | ((formData: FormData) => void | Promise<void>);
  disabled: boolean;
}

const LoginFields: FC<LofinFieldsProps> = ({ formAction, disabled }) => {
  const { fieldsErrors } = useMegaForm();

  const TooltipContent =
    'if you forget your password: Fill the email input and click this button';

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

      <div className="flex gap-2">
        <Button
          variant="noStyle"
          className="text-s bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400"
          type="submit"
          formAction={formAction}
          disabled={!!fieldsErrors.email || disabled}
        >
          Reset Password
        </Button>
        <Tooltip content={TooltipContent} position="top">
          <CiCircleInfo color="white" className="h-8 w-8" />
        </Tooltip>
      </div>
    </div>
  );
};

export default LoginFields;
