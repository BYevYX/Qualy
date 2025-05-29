'use client';
import { Input, Tooltip, useMegaForm } from '@qualy/front-share/client';
import { Button } from '@qualy/front-share/server';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { CiCircleInfo } from 'react-icons/ci';

import { LoginSteps } from '../model/types';
import { PasswordInput } from 'src/shared';

interface FieldSectionProps {
  step: LoginSteps;
}

const MainFiledsSection: FC<FieldSectionProps> = ({ step }) => {
  const { controlRegister } = useMegaForm();

  let name = 'email';
  let placeholder = 'Email';

  if (step === 'two-factor') {
    name = 'twoFactorCode';
    placeholder = '2FA code';
  }

  return (
    <Input
      {...controlRegister(name)}
      type="email"
      placeholder={placeholder}
      className="text-blue-600"
      inputStyle="underline"
    />
  );
};

interface PasswordSectionProps extends FieldSectionProps {
  handleStep: (step: LoginSteps) => void;
}

const PasswordSection: FC<PasswordSectionProps> = ({ step, handleStep }) => {
  if (step === 'reset-password' || step === 'two-factor') {
    return;
  }

  const TooltipContent =
    'If you forget your password you can rest it with your email';

  return (
    <>
      <PasswordInput name="password" placeholder="Password" />

      <div className="flex gap-2">
        <Button
          variant="additional"
          className="text-s rounded bg-gray-500 pr-2 pl-2 hover:bg-gray-600 disabled:bg-gray-400"
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
  );
};

interface LofinFieldsProps {
  handleStep: (step: LoginSteps) => void;
}

export const LoginFields: FC<LofinFieldsProps> = ({ handleStep }) => {
  const search = useSearchParams();
  const step = search.get('step') as LoginSteps;

  return (
    <div className="flex flex-col gap-5">
      <MainFiledsSection step={step} />
      <PasswordSection step={step} handleStep={handleStep} />
    </div>
  );
};
