import { string, StringSchema } from 'yup';

import { SignupFields } from 'src/widjets/signup/model/types';

const maxLength = 100;
const passwordMinLength = 8;
const usernameMinLength = 3;

const baseString = (fieldName: string) =>
  string()
    .required(`${fieldName} is required`)
    .max(maxLength, `${fieldName} must be no longer than 100 characters`);

const emailSchema = baseString('Email').email('Not valid Email');
const passwordSchema = baseString('Password').min(
  passwordMinLength,
  `Password must be at least ${passwordMinLength} characters`,
);

const verifyPasswordSchema = baseString('Verify Password').test(
  'passwords-match',
  'Password need to match',
  function (value) {
    const password = this.options.context?.password;
    return value === password;
  },
);

const usernameSchema = baseString('Username').min(
  usernameMinLength,
  `Username must be at least ${usernameMinLength} characters`,
);

export default {
  email: emailSchema,
  password: passwordSchema,
  verifyPassword: verifyPasswordSchema,
  username: usernameSchema,
} as Record<SignupFields, StringSchema<string>>;
