import { object } from 'yup';

import {
  emailSchema,
  passwordSchema,
  usernameSchema,
  verifyPasswordSchema,
} from 'src/shared';

export const signupFieldsSchema = {
  email: emailSchema,
  password: passwordSchema,
  verifyPassword: verifyPasswordSchema,
  username: usernameSchema,
};

export const signupSchema = object(signupFieldsSchema);
