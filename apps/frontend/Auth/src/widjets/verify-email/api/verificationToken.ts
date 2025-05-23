'use server';

import {
  deleteVerificationToken,
  getVerificationToken,
  verifyUserEmail,
} from '../../../utils/db/verify';
import { VerificationCode } from '../model/types';
import { StatusType } from '@qualy/front-share/types';
import { sendEmail } from 'src/features/mail/api/send';
import { generateVerificationToken } from 'src/features/tokens/api/generate';
import { authGetUser } from 'src/utils/db/auth';

export const processVerificationToken = async (
  token: string,
): Promise<{ status: StatusType; code: VerificationCode }> => {
  const verificationToken = await getVerificationToken({ token });

  if (!verificationToken) {
    return {
      status: 'error',
      code: 'noToken',
    };
  }

  if (verificationToken.expires < new Date()) {
    const user = await authGetUser({ email: verificationToken.email });
    const newVerificationToken = await generateVerificationToken(
      verificationToken.email,
    );

    if (!user || !user.name) {
      return {
        status: 'error',
        code: 'noUser',
      };
    }

    await sendEmail(user.email, 'verifyEmail', {
      username: user.name as string,
      token: newVerificationToken.token,
    });
    return {
      status: 'info',
      code: 'expired',
    };
  }

  await verifyUserEmail({ email: verificationToken.email });
  await deleteVerificationToken(verificationToken.token);

  return { status: 'success', code: 'ok' };
};
