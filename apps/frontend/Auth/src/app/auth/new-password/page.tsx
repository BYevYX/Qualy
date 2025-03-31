'use client';
import { useSearchParams } from 'next/navigation';
import { FC, useActionState } from 'react';

import { MegaForm } from '@qualy/front-share/client';
import { AuthActionObject } from 'src/features/common/model/types';
import schemas from 'src/utils/validateInputs';
import { processNewPasswordAction } from 'src/widjets/new-password/api/newPasswordAction';
import NewPasswordButton from 'src/widjets/new-password/ui/NewPasswordButton';
import NewPasswordFields from 'src/widjets/new-password/ui/NewPasswordFields';

const NewPassword: FC = () => {
  const search = useSearchParams();
  const token = search.get('token');

  const [state, action] = useActionState(
    async (_: AuthActionObject, formData: FormData) => {
      if (!token) {
        return { error: 'Why are you here? In this page nothing interesting' };
      }

      return await processNewPasswordAction(formData, token);
    },
    {},
  );

  return (
    <MegaForm
      action={action}
      fieldsRender={<NewPasswordFields />}
      submitButtonRender={(props) => <NewPasswordButton {...props} />}
      validationSchemas={schemas}
      state={state}
    />
  );
};

export default NewPassword;
