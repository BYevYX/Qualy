import cn from 'classnames';
import Link from 'next/link';
import { FC } from 'react';

import { Button } from '@qualy/front-share/server';

interface SignupSubmitButtonProps {
  isFormErrorDisplay: boolean;
  disabled: boolean;
}

const SignupSubmitButton: FC<SignupSubmitButtonProps> = ({
  isFormErrorDisplay,
  disabled,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 transition-all delay-300 duration-0 ease-linear',
        {
          'mt-7': !isFormErrorDisplay,
        },
      )}
    >
      <Button type="submit" disabled={disabled}>
        Create Account
      </Button>
      <span className="text-cyan-700">
        Already have an account?{' '}
        <Link
          className="text-amber-400 hover:text-amber-200"
          href="/auth/login"
        >
          Login
        </Link>
      </span>
    </div>
  );
};

export default SignupSubmitButton;
