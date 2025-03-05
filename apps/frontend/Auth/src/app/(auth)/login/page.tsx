'use client';
import { FC, useActionState } from 'react';

import { MegaForm } from '@qualy/front-share/client';
import schemas from 'src/utils/validateInputs';
import { loginAction } from 'src/widjets/login/api/loginActions';
import LoginFields from 'src/widjets/login/ui/LoginFields';
import LoginSubmitButton from 'src/widjets/login/ui/LoginSubmitButton';
import { AuthActionObject } from 'src/widjets/share/model/types';

const Login: FC = () => {
  const [state, action] = useActionState(
    async (_: AuthActionObject, formData: FormData) =>
      await loginAction(formData),
    { succes: false },
  );

  console.log(state);

  return (
    <MegaForm
      action={action}
      inputRender={<LoginFields />}
      submitButtonRender={(props) => <LoginSubmitButton {...props} />}
      validationSchemas={schemas}
      formError={state}
    />
  );
};

export default Login;
