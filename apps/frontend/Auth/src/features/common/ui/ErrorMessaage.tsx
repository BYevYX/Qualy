import type { FC } from 'react';

import { StatusComponent } from '@qualy/front-share/server';

const BaseString = 'There was a problem when trying to authenticate.';

const errorsMap: Record<string, string> = {
  Configuration: `${BaseString} Please contact us if this error persists.`,
  AccessDenied: `${BaseString} Access denied. Please try another way to authenticate`,
  Verification: `${BaseString} Verification failed. Please try again.`,
  Default: `${BaseString} Sorry! Something went wrong.`,
};

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <StatusComponent display className="m-1 whitespace-pre-wrap" type="error">
      <span>
        {errorsMap[message] || errorsMap.Default} {'\n'}Error message:{'\n'}
      </span>
      <code className="rounded-sm bg-slate-100 p-1 text-xs">{message}</code>
    </StatusComponent>
  );
};

export default ErrorMessage;
