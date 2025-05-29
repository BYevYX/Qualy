import { Button } from '@qualy/front-share/server';
import cn from 'classnames';
import { FC } from 'react';

interface LoginFormContentProps {
  disabled: boolean;
  isFormErrorDisplay: boolean;
}

export const NewPasswordButton: FC<LoginFormContentProps> = ({
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
        Update password
      </Button>
    </div>
  );
};
