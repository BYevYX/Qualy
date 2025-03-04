import { useContext } from 'react';
import { useFormStatus } from 'react-dom';

import { MegaFormContext } from './MegaFormContext';

export const useMegaForm = () => {
  const { pending } = useFormStatus();
  const obj = useContext(MegaFormContext);

  if (!obj) {
    throw new Error('useMegaForm need to use inside MegaForm component');
  }

  const { fields, setFields, fieldsErrors, setFieldsErrors } = obj;

  return {
    fieldsErrors,
    setFieldsErrors,
    fields,
    setFields,
    pending,
  };
};
