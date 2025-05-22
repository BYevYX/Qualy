'use client';
import { FC } from 'react';

import { PasswordInput } from 'src/shared';

export const NewPasswordFields: FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <PasswordInput name="password" placeholder="Password" />
    </div>
  );
};
