'use server';
import { ValidationError } from 'yup';

import { ResetPasswordError } from '../model/errors';
import { sendEmail } from 'src/features/mail/api/send';
import { generateResetPasswordToken } from 'src/features/tokens/api/generate';
import { AuthActionObject } from 'src/shared';
import { authGetUser } from 'src/utils/db/auth';
import { resetPasswordSchema } from 'src/widjets/login';

export async function resetPasswordAction(
  data: FormData,
): Promise<AuthActionObject> {
  try {
    const { email } = await resetPasswordSchema.validate(
      Object.fromEntries(data.entries()),
    );

    const user = await authGetUser({ email });

    if (!user) {
      throw new ResetPasswordError('User does not exist!');
    }

    if (!user.name || !user.password) {
      throw new ResetPasswordError(
        'This email already used for OAuth autorization!',
      );
    }

    const resetPasswordToken = await generateResetPasswordToken(email);

    const { error } = await sendEmail(email, 'resetPassword', {
      username: user.name,
      token: resetPasswordToken.token,
    });

    if (error) {
      throw new ResetPasswordError(error.message);
    }

    return { success: 'Email for reset password was sent!' };
  } catch (e) {
    if (e instanceof ValidationError) {
      return { error: e.message };
    }

    if (e instanceof ResetPasswordError) {
      return { error: e.message };
    }

    console.error(e);
    return { error: 'Something went wrong!' };
  }
}
