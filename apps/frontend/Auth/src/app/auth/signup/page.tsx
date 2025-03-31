'use client';
import { FC, useActionState } from 'react';

import { MegaForm } from '@qualy/front-share/client';
import { AuthActionObject } from 'src/features/common/model/types';
import schemas from 'src/utils/validateInputs';
import { registerAction } from 'src/widjets/signup/api/signupActions';
import SignupFields from 'src/widjets/signup/ui/SignupFileds';
import SignupSubmitButton from 'src/widjets/signup/ui/SignupSubmitButton';

const Signup: FC = () => {
  const [state, action] = useActionState(
    async (_: AuthActionObject, formData: FormData) =>
      await registerAction(formData),
    {},
  );

  return (
    <MegaForm
      action={action}
      fieldsRender={<SignupFields />}
      submitButtonRender={(props) => <SignupSubmitButton {...props} />}
      validationSchemas={schemas}
      state={state}
    />
  );
};

export default Signup;
