import { object } from 'yup';

import { passwordSchema } from 'src/shared';

export const newPasswordSchema = object({
  password: passwordSchema,
});
