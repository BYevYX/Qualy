'use client';

import { useSearchParams } from 'next/navigation';
import type { FC } from 'react';

import { Card, CardContent, CardHeader } from '@qualy/front-share/server';
import ErrorMessage from 'src/features/shared/ui/ErrorMessage';

const ErrorPage: FC = () => {
  const search = useSearchParams();
  const error = search.get('error');

  return (
    <Card className="max-w-3xs self-center">
      <CardHeader className="text-white">
        <h3>Error!</h3>
      </CardHeader>
      <CardContent>
        {<ErrorMessage message={error || 'Why are you here brother?'} />}
      </CardContent>
    </Card>
  );
};

export default ErrorPage;
