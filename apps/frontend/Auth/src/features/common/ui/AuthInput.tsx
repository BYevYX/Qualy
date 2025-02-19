import type { FC } from 'react';
import { scheduler } from 'timers/promises';
import { Schema, StringSchema } from 'yup';

import { Input } from '@qualy/front_share/client';
import { useAuthErrors } from 'src/features/AuthErrors/model/AuthErrorsContext';

interface AuthProps {
  placeholder?: string;
  name: string;
  type: string;
  schema?: StringSchema | Schema;
}

const AuthInput: FC<AuthProps> = ({ name, placeholder, type, schema }) => {
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
    <Input
      name={name}
      type={type}
      placeholder={placeholder}
      schema={schema}
      onChange={handleChange}
    />
  );
};

export default AuthInput;
