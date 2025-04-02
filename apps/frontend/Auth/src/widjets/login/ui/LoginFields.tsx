'use client';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { CiCircleInfo } from 'react-icons/ci';

import { LoginSteps } from '../model/types';
import { Input, Tooltip, useMegaForm } from '@qualy/front-share/client';
import { Button } from '@qualy/front-share/server';
import PasswordInput from 'src/features/common/ui/PasswordInput';

interface LofinFieldsProps {
  handleStep: (step: LoginSteps) => void;
}

const LoginFields: FC<LofinFieldsProps> = ({ handleStep }) => {
  const { controlRegister } = useMegaForm();

  const search = useSearchParams();
  const step = search.get('step');

  const TooltipContent =
    'if you forget your password: Fill the email input and click this button';

  return (
    <div className="flex flex-col gap-5">
      <Input
        {...controlRegister('email')}
        type="text"
        placeholder="Email"
        className="text-blue-600"
        inputStyle="underline"
      />
      {step !== 'reset-password' && (
        <>
          <PasswordInput name="password" placeholder="Password" />

          <div className="flex gap-2">
            <Button
              variant="noStyle"
              className="text-s bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400"
              type="button"
              onClick={() => handleStep('reset-password')}
            >
              Reset Password
            </Button>
            <Tooltip content={TooltipContent} position="top">
              <CiCircleInfo color="white" className="h-8 w-8" />
            </Tooltip>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginFields;
