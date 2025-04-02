import { FC } from 'react';

import { EmailTemplate } from '@qualy/front-share/templates';
import { EMAIL_VERIFICATION_URL } from 'src/routes';
import { getFullUrl } from 'src/utils/helpers';

const VerificationEmailTemplate: FC<{
  token: string;
  username: string;
}> = ({ token, username }) => {
  const confirmLink = getFullUrl(EMAIL_VERIFICATION_URL, {
    token,
  });

  const text = {
    header: 'Verification Email',
    greeting: `Hey ${username},`,
    content:
      'Thank you for signing up with Qualy!\nTo complete your registration and ensure the security of your account, please confirm your email address by clicking the button below:',
    additional: (
      <span>
        If the button doesn&apos;t work, you can copy and paste this link into
        your browser: <a href={confirmLink}>{confirmLink}</a>
      </span>
    ),
    linkExpire: 'This link will expire in 1 hour.',
  };

  return (
    <EmailTemplate text={text}>
      <a href={confirmLink}>Confirm email</a>
    </EmailTemplate>
  );
};

export default VerificationEmailTemplate;
