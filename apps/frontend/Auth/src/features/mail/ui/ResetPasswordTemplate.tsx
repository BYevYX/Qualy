import { EmailTemplate } from '@qualy/front-share/templates';
import { FC } from 'react';

import { RESET_PASSWORD_URL, getFullUrl } from 'src/shared';

const VerificationEmailTemplate: FC<{
  token: string;
  username: string;
}> = ({ token, username }) => {
  const resetLink = getFullUrl(RESET_PASSWORD_URL, {
    token,
  });

  const text = {
    header: 'Password Reset Instructions',
    greeting: `Dear ${username},`,
    content:
      'We received a request to reset the password for your Qualy account. To set a new password, please click the link below:',
    linkExpire: 'This link will expire in 1 hour.',
  };

  return (
    <EmailTemplate text={text}>
      <a href={resetLink}>Reset password</a>
    </EmailTemplate>
  );
};

export default VerificationEmailTemplate;
