'use client';
import { FC, useActionState } from 'react';

import { MegaForm } from '@qualy/front-share/client';
import schemas from 'src/utils/validateInputs';
import { AuthActionObject } from 'src/widjets/share/model/types';
import { registerAction } from 'src/widjets/signup/api/signupActions';
import SignupFields from 'src/widjets/signup/ui/SignupFileds';
import SignupSubmitButton from 'src/widjets/signup/ui/SignupSubmitButton';

const Signup: FC = () => {
  const [state, action] = useActionState(
    async (_: AuthActionObject, formData: FormData) =>
      await registerAction(formData),
    { succes: false },
  );

  return (
    <MegaForm
      action={action}
      inputRender={<SignupFields />}
      submitButtonRender={(props) => <SignupSubmitButton {...props} />}
      validationSchemas={schemas}
      formError={state}
    />
  );
};

export default Signup;
