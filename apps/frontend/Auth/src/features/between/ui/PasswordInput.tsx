'use client';
import { FC, useState } from 'react';

import { InputWithIcon } from '@qualy/front_share/server';
import closeEye from 'public/images/close_eye.png';
import openEye from 'public/images/open_eye.png';

interface PasswordInputProps {
  name: string;
  placeholder: string;
}

const PasswordInput: FC<PasswordInputProps> = ({ name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputWithIcon
      className="flex"
      icon={showPassword ? openEye : closeEye}
      alt="eye"
      inputAtributes={{
        type: showPassword ? 'text' : 'password',
        placeholder,
        name,
      }}
      imageAtributes={{
        onClick: () => setShowPassword(!showPassword),
      }}
    />
  );
};

export default PasswordInput;
