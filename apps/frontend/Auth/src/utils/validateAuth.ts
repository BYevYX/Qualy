import { object } from 'yup';

import schems from './validateInputs';

export const loginSchema = object({
  email: schems.email,
  password: schems.password,
});

export const signupSchema = loginSchema.shape({
  username: schems.username,
});

export const resetPasswordSchema = object({
  email: schems.email,
});

export const newPasswordSchema = object({
  password: schems.password,
});
