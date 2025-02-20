'use client';
import Link from 'next/link';
import { FC, useState } from 'react';

import { Input } from '@qualy/front_share/client';
import { Button } from '@qualy/front_share/server';
import { useAuthErrors } from 'src/features/AuthErrors/model/AuthErrorsContext';
import PasswordInput from 'src/features/common/ui/PasswordInput';
import schems from 'src/utils/validate';

const LoginFormContent: FC = () => {
  const [errors, setErrors] = useAuthErrors();
  const [formData, setFormData] = useState<Record<string, string>>({
    email: '',
    password: '',
  });

  const disabled = Object.values(errors).some((error) => error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };

    schems[e.target.name]
      .validate(newFormData[e.target.name])
      .then(() => setErrors({ ...errors, [e.target.name]: null }))
      .catch((err) => setErrors({ ...errors, [e.target.name]: err.message }));

    setFormData(newFormData);
  };

  return (
    <div onChange={handleChange} className="flex flex-col gap-5">
      <Input
        type="text"
        placeholder="Email"
        name="email"
        error={errors.email}
        className="text-blue-600"
        inputStyle="underline"
      />
      <PasswordInput name="password" placeholder="Password" />
      <Button type="submit" disabled={disabled}>
        Login
      </Button>

      <span className="text-cyan-700">
        Don&apos;t have an account?{' '}
        <Link className="text-amber-400 hover:text-amber-200" href="/signup">
          Signup
        </Link>
      </span>
    </div>
  );
};

export default LoginFormContent;
