'use client';
import Link from 'next/link';
import { FC, useState } from 'react';

import { Input } from '@qualy/front_share/client';
import { Button } from '@qualy/front_share/server';
import { useAuthErrors } from 'src/features/AuthErrors/model/AuthErrorsContext';
import PasswordInput from 'src/features/common/ui/PasswordInput';
import schems from 'src/utils/validate';

const SignupFormContent: FC = () => {
  const [errors, setErrors] = useAuthErrors();

  const disabled = Object.values(errors).some((error) => error);

  const [formData, setFormData] = useState<Record<string, string>>({
    email: '',
    password: '',
    verifyPassword: '',
    username: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };

    schems[e.target.name]
      .validate(newFormData[e.target.name], { context: newFormData })
      .then(() => setErrors({ ...errors, [e.target.name]: null }))
      .catch((err) => setErrors({ ...errors, [e.target.name]: err.message }));

    setFormData(newFormData);
  };

  return (
    <div onChange={handleChange} className="flex flex-col">
      <div className="flex flex-col gap-5">
        <Input
          name="username"
          placeholder="Username"
          className="border-amber-300 text-amber-600"
          inputStyle="underline"
          error={errors.username}
        />
        <Input
          placeholder="Email"
          name="email"
          className="border-amber-300 text-amber-600"
          inputStyle="underline"
          error={errors.email}
        />
        <PasswordInput name="password" placeholder="Password" />
        <PasswordInput name="verifyPassword" placeholder="Verify Password" />
      </div>
      <div className="mt-5 flex flex-col gap-5">
        <Button type="submit" disabled={disabled}>
          Create Account
        </Button>
        <span className="text-cyan-700">
          Already have an account?{' '}
          <Link className="text-amber-400 hover:text-amber-200" href="/login">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignupFormContent;
