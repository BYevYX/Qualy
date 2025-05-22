'use server';
import bcrypt from 'bcryptjs';
import { ValidationError } from 'yup';

import {
  updatePassword,
  getResetPasswordTokenByToken,
  deleteResetPasswordToken,
} from '../../../utils/db/password';
import { NewPasswordError } from '../model/errors';
import { newPasswordSchema } from '../model/shemas';
import { AuthActionObject } from 'src/shared';
import { authGetUserByEmail } from 'src/utils/db/auth';

const saltRounds = 10;

export async function processNewPasswordAction(
  data: FormData,
  token: string,
): Promise<AuthActionObject> {
  try {
    const { password: newPassword } = await newPasswordSchema.validate(
      Object.fromEntries(data.entries()),
    );

    const existingToken = await getResetPasswordTokenByToken(token);

    if (!existingToken) {
      throw new NewPasswordError('Invalid Token');
    }

    const user = await authGetUserByEmail(existingToken.email);

    if (!user) {
      throw new NewPasswordError('User does not exist!');
    }

    if (!user.password) {
      throw new NewPasswordError(
        'This email already used for OAuth autorization!',
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await updatePassword(user.id, hashedPassword);

    await deleteResetPasswordToken(existingToken.token);

    return { success: 'Password was successfuly updated!' };
  } catch (e) {
    if (e instanceof ValidationError) {
      return { error: e.message };
    }

    if (e instanceof NewPasswordError) {
      return { error: e.message };
    }

    console.error(e);
    return { error: 'Something went wrong!' };
  }
}
