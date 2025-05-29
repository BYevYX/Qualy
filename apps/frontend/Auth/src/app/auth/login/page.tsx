'use client';
import { MegaForm } from '@qualy/front-share/client';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useActionState, useCallback } from 'react';

import { AuthActionObject, createQueryStringAndPath } from 'src/shared';
import {
  loginFieldsSchema,
  LoginFields,
  LoginSubmitButton,
} from 'src/widjets/login';
import { loginAction } from 'src/widjets/login/api/loginAction';
import { resetPasswordAction } from 'src/widjets/login/api/resetPasswordAction';
import { LoginSteps } from 'src/widjets/login/model/types';

const Login: FC = () => {
  const router = useRouter();
  const patname = usePathname();

  const handleStep = useCallback(
    (step?: LoginSteps) => {
      router.push(createQueryStringAndPath(patname, step ? { step } : {}));
    },
    [patname, router],
  );

  const [authState, authAction] = useActionState(
    async (_: AuthActionObject, formData: FormData) => {
      const state = await loginAction(formData);

      if (state.success === '2FA') {
        handleStep('two-factor');
        state.success = 'Two factor code sent to your mail!';
      }
      return state;
    },
    {},
  );

  const [resetState, resetAction] = useActionState(
    async (_: AuthActionObject, formData: FormData) =>
      await resetPasswordAction(formData),
    {},
  );

  const submitButtonRender = useCallback(
    (props: { disabled: boolean; isFormErrorDisplay: boolean }) => (
      <LoginSubmitButton
        actions={{ resetPassword: resetAction, login: authAction }}
        {...props}
      />
    ),
    [resetAction],
  );

  // TODO: change this because it work bad
  const fullState = {
    ...authState,
    ...resetState,
  };

  return (
    <MegaForm
      action={authAction}
      fieldsRender={<LoginFields handleStep={handleStep} />}
      submitButtonRender={submitButtonRender}
      validationSchemas={loginFieldsSchema}
      state={fullState}
      onSubmit={(e) => e.preventDefault}
    />
  );
};

export default Login;
