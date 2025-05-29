import { EmailTemplate } from '@qualy/front-share/templates';
import { FC } from 'react';

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

  return (
    <EmailTemplate text={text}>
      <span
        style={{
          fontSize: '24px',
          lineHeight: '24px',
          fontWeight: 600,
        }}
      >
        {token}
      </span>
    </EmailTemplate>
  );
};

export default TwoFactorTemplate;
