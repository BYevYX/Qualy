import { object, string, ref } from 'yup';

const maxLength = 100;
const passwordMinLength = 8;
const usernameMinLength = 3;

const baseString = (fieldName: string) =>
  string()
    .required(`${fieldName} is required`)
    .max(maxLength, `${fieldName} must be no longer than 100 characters`);

export const emailSchema = baseString('Email').email('Not valid Email');
export const passwordSchema = baseString('Password').min(
  passwordMinLength,
  `Password must be at least ${passwordMinLength} characters`,
);

const baseSchema = object({
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = baseSchema;

export const usernameSchema = baseString('Username').min(
  usernameMinLength,
  `Username must be at least ${usernameMinLength} characters`,
);

export const verifyPasswordSchema = baseString('Verify Password').equals(
  [ref('password'), null],
  'Passwords must match',
);

export const signupSchema = baseSchema.shape({
  username: usernameSchema,
  verifyPassword: verifyPasswordSchema,
});
