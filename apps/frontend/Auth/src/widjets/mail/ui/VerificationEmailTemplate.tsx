import { FC } from 'react';

import { DOMAIN, EMAIL_VERIFICATION_URL } from 'src/routes';

const VerificationEmailTemplate: FC<{
  token: string;
}> = ({ token }) => {
  const confirmPath = new URL(EMAIL_VERIFICATION_URL, DOMAIN).toString();
  const query = new URLSearchParams({ token }).toString();
  const confirmLink = confirmPath + '?' + query;

  return (
    <div>
      <h1>Verification Email</h1>
      <a href={confirmLink}>Verify email</a>
    </div>
  );
};

export default VerificationEmailTemplate;
