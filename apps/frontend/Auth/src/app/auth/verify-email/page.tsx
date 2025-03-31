'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState, useTransition } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Loading,
  StatusComponent,
} from '@qualy/front-share/server';
import { StatusType } from '@qualy/front-share/types';
import { NEED_LOGIN_REDIRECT } from 'src/routes';
import { processVerificationToken } from 'src/widjets/verify-email/api/verificationToken';
import { VerificationCode } from 'src/widjets/verify-email/model/types';

interface VerifyState {
  status?: StatusType;
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

  const search = useSearchParams();
  const token = search.get('token');

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
          <>
            <StatusComponent display={!isPending} type={state.status}>
              {state.message}
            </StatusComponent>
            <Button variant="noStyle" className="mt-3 w-full bg-white">
              <Link href={NEED_LOGIN_REDIRECT}>Login</Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default VerifyPage;
