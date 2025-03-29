import { FC } from 'react';

import { EmailTemplate } from '@qualy/front-share/templates';
import { RESET_PASSWORD_URL } from 'src/routes';
import { getFullUrl } from 'src/utils/helpers';

const VerificationEmailTemplate: FC<{
  token: string;
  username: string;
  redirectUrl?: string;
}> = ({ token, username, redirectUrl }) => {
  const resetLink = getFullUrl(RESET_PASSWORD_URL, {
    token,
    redirectUrl: redirectUrl ?? '',
  });

  const text = {
    header: 'Password Reset Instructions',
    greeting: `Dear ${username},`,
    content:
      'We received a request to reset the password for your Qualy account. To set a new password, please click the link below:',
    linkExpire: 'This link will expire in 1 day.',
  };

  return (
    <EmailTemplate text={text}>
      <a href={resetLink}>Reset password</a>
    </EmailTemplate>
  );
};

export default VerificationEmailTemplate;
