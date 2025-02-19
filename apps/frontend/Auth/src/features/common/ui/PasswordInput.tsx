'use client';
import { FC, useState } from 'react';

import { InputWithIcon } from '@qualy/front_share/server';
import closeEye from 'public/images/close_eye.png';
import openEye from 'public/images/open_eye.png';
import { useAuthErrors } from 'src/features/AuthErrors/model/AuthErrorsContext';
import { passwordSchema, verifyPasswordSchema } from 'src/utils/validate';

interface PasswordInputProps {
  name: string;
  placeholder: string;
}

const PasswordInput: FC<PasswordInputProps> = ({ name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useAuthErrors();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { error } = e.target.dataset;

    if (error) {
      setErrors({ ...errors, [name]: new Error(error) });
    } else {
      setErrors({ ...errors, [name]: null });
    }
  };

  return (
    <InputWithIcon
      icon={showPassword ? openEye : closeEye}
      alt="eye"
      schema={name === 'password' ? passwordSchema : verifyPasswordSchema}
      inputAtributes={{
        type: showPassword ? 'text' : 'password',
        placeholder,
        name,
        onChange: handleChange,
      }}
      imageAtributes={{
        onClick: () => setShowPassword(!showPassword),
      }}
    />
  );
};

export default PasswordInput;
