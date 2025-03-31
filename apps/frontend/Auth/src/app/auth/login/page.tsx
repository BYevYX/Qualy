'use client';
import { FC, useActionState } from 'react';

import { MegaForm } from '@qualy/front-share/client';
import { AuthActionObject } from 'src/features/common/model/types';
import schemas from 'src/utils/validateInputs';
import { loginAction } from 'src/widjets/login/api/loginAction';
import { resetPasswordAction } from 'src/widjets/login/api/resetPasswordAction';
import LoginFields from 'src/widjets/login/ui/LoginFields';
import LoginSubmitButton from 'src/widjets/login/ui/LoginSubmitButton';

const Login: FC = () => {
  const [authState, authAction] = useActionState(
    async (_: AuthActionObject, formData: FormData) =>
      await loginAction(formData),
    {},
  );

  const [resetState, resetAction, isResetPending] = useActionState(
    async (_: AuthActionObject, formData: FormData) =>
      await resetPasswordAction(formData),
    {},
  );

  // TODO: change this because it work bad
  const fullState = {
    ...authState,
    ...resetState,
  };

  return (
    <MegaForm
      action={authAction}
      fieldsRender={
        <LoginFields formAction={resetAction} disabled={isResetPending} />
      }
      submitButtonRender={(props) => <LoginSubmitButton {...props} />}
      validationSchemas={schemas}
      state={fullState}
    />
  );
};

export default Login;
