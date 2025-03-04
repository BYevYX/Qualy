'use client';
import { FC, useState } from 'react';

import { useMegaForm } from '@qualy/front-share/client';
import { InputWithIcon } from '@qualy/front-share/server';
import closeEye from 'public/images/close_eye.png';
import openEye from 'public/images/open_eye.png';

interface PasswordInputProps {
  name: 'password' | 'verifyPassword';
  placeholder: string;
}

const PasswordInput: FC<PasswordInputProps> = ({ name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { fieldsErrors } = useMegaForm();

  return (
    <InputWithIcon
      icon={showPassword ? openEye : closeEye}
      alt="eye"
      inputAtributes={{
        type: showPassword ? 'text' : 'password',
        placeholder,
        name,
        error: fieldsErrors[name],
        className: 'text-blue-600',
        inputStyle: 'underline',
      }}
      imageAtributes={{
        onClick: () => setShowPassword(!showPassword),
      }}
    />
  );
};

export default PasswordInput;
