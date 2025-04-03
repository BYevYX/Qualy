import cn from 'classnames';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { LoginSteps } from '../model/types';
import { Button } from '@qualy/front-share/server';

function getTexts(step: LoginSteps) {
  const buttonText: Record<Exclude<LoginSteps, null>, string> = {
    'reset-password': 'Reset password',
    'two-factor': 'Confirm',
  };

  const isLoginStep = step === null;

  return {
    linkText: isLoginStep ? 'signup' : 'login',
    button: step ? buttonText[step] : 'Login',
    spanText: isLoginStep ? "Don't have an account? " : '',
    href: `/auth/${isLoginStep ? 'signup' : 'login'}`,
  };
}

interface LoginSubmitProps {
  disabled: boolean;
  isFormErrorDisplay: boolean;
  formAction: (formData: FormData) => void;
}

const LoginSubmitButton: FC<LoginSubmitProps> = ({
  disabled,
  isFormErrorDisplay,
  formAction,
}) => {
  const search = useSearchParams();
  const step = search.get('step') as LoginSteps;
  const isResetPasswordStep = step === 'reset-password';

  const texts = getTexts(step);

  return (
    <div
      className={cn('flex flex-col gap-1', {
        'mt-7': !isFormErrorDisplay,
      })}
    >
      <Button
        type="submit"
        disabled={disabled}
        formAction={isResetPasswordStep ? formAction : undefined}
      >
        {texts.button}
      </Button>

      <span className="text-cyan-700">
        {texts.spanText}
        <Link className="text-amber-400 hover:text-amber-200" href={texts.href}>
          {texts.linkText}
        </Link>
      </span>
    </div>
  );
};

export default LoginSubmitButton;
