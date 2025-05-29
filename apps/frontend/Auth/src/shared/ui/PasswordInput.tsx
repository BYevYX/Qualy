'use client';
import { useMegaForm } from '@qualy/front-share/client';
import { InputWithIcon } from '@qualy/front-share/server';
import { FC, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

interface PasswordInputProps {
  name: 'password' | 'verifyPassword';
  placeholder: string;
}

export const PasswordInput: FC<PasswordInputProps> = ({
  name,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { controlRegister } = useMegaForm();

  const iconProps = {
    color: 'white',
    size: 25,
    onClick() {
      setShowPassword(!showPassword);
    },
  };

  return (
    <InputWithIcon
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
      {...controlRegister(name)}
      className="text-blue-600"
      inputStyle="underline"
    >
      {showPassword ? (
        <FaRegEye {...iconProps} />
      ) : (
        <FaRegEyeSlash {...iconProps} />
      )}
    </InputWithIcon>
  );
};
