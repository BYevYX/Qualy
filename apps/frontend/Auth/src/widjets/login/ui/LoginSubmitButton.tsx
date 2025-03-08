import cn from 'classnames';
import Link from 'next/link';
import { FC } from 'react';

import { Button } from '@qualy/front-share/server';

interface LoginFormContentProps {
  disabled: boolean;
  isFormErrorDisplay: boolean;
}

const LoginSubmitButton: FC<LoginFormContentProps> = ({
  disabled,
  isFormErrorDisplay,
}) => {
  return (
    <div
      className={cn('flex flex-col gap-1', {
        'mt-7': !isFormErrorDisplay,
      })}
    >
      <Button type="submit" disabled={disabled}>
        Login
      </Button>

      <span className="text-cyan-700">
        Don&apos;t have an account?{' '}
        <Link
          className="text-amber-400 hover:text-amber-200"
          href="/auth/signup"
        >
          Signup
        </Link>
      </span>
    </div>
  );
};

export default LoginSubmitButton;
