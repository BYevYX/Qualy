'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState, useTransition } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Loading,
  StatusComponent,
} from '@qualy/front-share/server';
import { processVerificationToken } from 'src/widjets/share/api/tokens';
import { VerificationCode } from 'src/widjets/share/model/types';

interface VerifyState {
  status?: 'success' | 'error' | 'info';
  message?: string;
}

const textMap: Record<VerificationCode, string> = {
  ok: 'Your email has been verified.',
  noToken: 'There was a problem verifying your email.',
  noUser: 'There was a problem verifying your email. That user does not exist.',
  expired: 'Your email verification link has expired. We send you a new Email',
};

const VerifyPage: FC = () => {
  const [state, setState] = useState<VerifyState>({});

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const search = useSearchParams();
  const token = search.get('token');
  const redirect = search.get('redirectUrl');

  useEffect(() => {
    async function action() {
      if (!token) {
        setState({
          status: 'error',
          message: 'Why are you here? In this page nothing interesting)',
        });
        return;
      }

      const result = await processVerificationToken(token);
      startTransition(() =>
        setState({
          status: result.status,
          message: textMap[result.code],
        }),
      );

      if (result.status === 'success' && redirect === '/') {
        router.push('/');
      }
    }

    startTransition(action);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <CardHeader>Email Verification</CardHeader>
      <CardContent align="center" className="max-w-3xs">
        {isPending && <Loading />}
        {state.status && (
          <StatusComponent display={!isPending} type={state.status}>
            {state.message}
          </StatusComponent>
        )}
      </CardContent>
    </Card>
  );
};

export default VerifyPage;
