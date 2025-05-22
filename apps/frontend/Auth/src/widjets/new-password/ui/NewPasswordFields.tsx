'use client';
import { FC } from 'react';

import PasswordInput from 'src/features/shared/ui/PasswordInput';

const ResetPasswordButtonsFields: FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <PasswordInput name="password" placeholder="Password" />
    </div>
  );
};

export default ResetPasswordButtonsFields;
