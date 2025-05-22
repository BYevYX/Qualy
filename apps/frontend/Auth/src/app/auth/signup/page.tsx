'use client';
import { FC, useActionState } from 'react';

import { MegaForm } from '@qualy/front-share/client';
import { AuthActionObject } from 'src/shared';
import {
  registerAction,
  SignupFields,
  SignupSubmitButton,
  signupFieldsSchema,
} from 'src/widjets/signup';

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
      validationSchemas={signupFieldsSchema}
      state={state}
    />
  );
};

export default Signup;
