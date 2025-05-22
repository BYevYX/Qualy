import { object } from 'yup';

import { emailSchema, passwordSchema, twoFactorCodeSchema } from 'src/shared';

export const loginFieldsSchema = {
  email: emailSchema,
  password: passwordSchema,
  twoFactorCode: twoFactorCodeSchema,
};

export const loginSchema = object(loginFieldsSchema);

export const resetPasswordSchema = object({
  email: emailSchema,
});
