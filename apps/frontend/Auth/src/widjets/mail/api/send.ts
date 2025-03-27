import { Resend } from 'resend';

import VerificationEmailTemplate from '../ui/VerificationEmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

// TODO: add normal templates
const templates = {
  verifyEmail: {
    subject: 'Verify your email',
    template: VerificationEmailTemplate,
  },
  //   resetPassword: {
  //     subject: 'Reset your password',
  //     react: VerificationEmailTemplate
  //   },
};

// TODO: when domain in resend will be ready: change 'from' on custom email
export async function sendEmail(
  to: string | string[],
  token: string,
  variant: keyof typeof templates = 'verifyEmail',
) {
  const { subject, template } = templates[variant];

  return await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to,
    subject,
    react: template({ token }),
  });
}
