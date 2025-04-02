import { FC } from 'react';

import { EmailTemplate } from '@qualy/front-share/templates';

const TwoFactorTemplate: FC<{
  token: string;
  username: string;
}> = ({ token, username }) => {
  const text = {
    header: 'Password Reset Instructions',
    greeting: `Dear ${username},`,
    content:
      'To complete your login or verify your action, an additional security step is required. Below is your one-time two-factor authentication (2FA) code:',
    linkExpire: 'This code will expire in 10 minutes.',
  };

  return <EmailTemplate text={text}>{token}</EmailTemplate>;
};

export default TwoFactorTemplate;
