import cn from 'classnames';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { LoginSteps } from '../model/types';
import { Button } from '@qualy/front-share/server';

interface LoginFormContentProps {
  disabled: boolean;
  isFormErrorDisplay: boolean;
  formAction: (formData: FormData) => void;
}

const buttonText: Record<Exclude<LoginSteps, null>, string> = {
  'reset-password': 'Reset password',
  'two-factor': 'Confirm',
};

const LoginSubmitButton: FC<LoginFormContentProps> = ({
  disabled,
  isFormErrorDisplay,
  formAction,
}) => {
  const search = useSearchParams();
  const step = search.get('step') as LoginSteps;
  const isResetPasswordStep = step === 'reset-password';

  return (
    <div
      className={cn('flex flex-col gap-1', {
        'mt-7': !isFormErrorDisplay,
      })}
    >
      <Button
        type="submit"
        disabled={disabled}
        formAction={step === 'reset-password' ? formAction : undefined}
      >
        {step ? buttonText[step] : 'Login'}
      </Button>

      <span className="text-cyan-700">
        {!isResetPasswordStep && "Don't have an account? "}
        <Link
          className="text-amber-400 hover:text-amber-200"
          href={`/auth/${isResetPasswordStep ? 'login' : 'signup'}`}
        >
          {isResetPasswordStep ? 'Login' : 'Signup'}
        </Link>
      </span>
    </div>
  );
};

export default LoginSubmitButton;
