import type { FC } from 'react';
import { Resend } from 'resend';

import ResetPasswordTemplate from '../ui/ResetPasswordTemplate';
import TwoFactorTemplate from '../ui/TwoFactorTemplate';
import VerificationEmailTemplate from '../ui/VerificationEmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

type Templates = Record<
  'verifyEmail' | 'resetPassword' | 'twoFactor',
  {
    subject: string;
    template: FC<{
      token: string;
      username: string;
    }>;
  }
>;

const templates: Templates = {
  verifyEmail: {
    subject: 'Verify your email',
    template: VerificationEmailTemplate,
  },
  resetPassword: {
    subject: 'Reset your password',
    template: ResetPasswordTemplate,
  },
  twoFactor: {
    subject: 'Your One-Time Security Code for',
    template: TwoFactorTemplate,
  },
};

export async function sendEmail(
  to: string,
  variant: keyof typeof templates,
  templateParameters: {
    username: string;
    token: string;
  },
) {
  const { subject, template } = templates[variant];

  return await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to,
    subject,
    react: template(templateParameters),
  });
}
