import { object } from 'yup';

import {
  loginFieldsSchema,
  signupFieldsSchema,
  emailSchema,
  passwordSchema,
} from './validateInputs';

export const loginSchema = object(loginFieldsSchema);

export const signupSchema = object(signupFieldsSchema);

export const resetPasswordSchema = object({
  email: emailSchema,
});

export const newPasswordSchema = object({
  password: passwordSchema,
});
