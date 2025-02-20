'use client';
import { FC, useState } from 'react';

import { InputWithIcon } from '@qualy/front_share/server';
import closeEye from 'public/images/close_eye.png';
import openEye from 'public/images/open_eye.png';
import { useAuthErrors } from 'src/features/AuthErrors/model/AuthErrorsContext';

interface PasswordInputProps {
  name: 'password' | 'verifyPassword';
  placeholder: string;
}

const PasswordInput: FC<PasswordInputProps> = ({ name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors] = useAuthErrors();

  return (
    <InputWithIcon
      icon={showPassword ? openEye : closeEye}
      alt="eye"
      inputAtributes={{
        type: showPassword ? 'text' : 'password',
        placeholder,
        name,
        error: errors[name],
      }}
      imageAtributes={{
        onClick: () => setShowPassword(!showPassword),
      }}
    />
  );
};

export default PasswordInput;
