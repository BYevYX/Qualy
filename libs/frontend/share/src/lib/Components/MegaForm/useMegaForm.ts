'use client';
import { useCallback, useContext } from 'react';
import { useFormStatus } from 'react-dom';

import { MegaFormContext } from './MegaFormContext';

interface ControlRegisterOptions {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
}

export const useMegaForm = () => {
  const { pending } = useFormStatus();
  const obj = useContext(MegaFormContext);

  if (!obj) {
    throw new Error('useMegaForm need to use inside MegaForm component');
  }

  const {
    fields,
    setFields,
    fieldsErrors,
    setFieldsErrors,
    validationSchemas,
  } = obj;

  const controlRegister = useCallback(
    (name: string, options: ControlRegisterOptions = { defaultValue: '' }) => {
      const validate = async (newFields: Record<string, string>) => {
        try {
          await validationSchemas[name].validate(newFields[name], {
            context: newFields,
          });

          setFieldsErrors((prev) => ({ ...prev, [name]: '' }));
        } catch (err) {
          setFieldsErrors((prev) => ({
            ...prev,
            [name]: (err as Error).message,
          }));
        }
      };

      const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFields((prev) => ({ ...prev, [name]: value }));

        await validate({ ...fields, [name]: value });

        options.onChange?.(e);
      };

      return {
        name,
        value: fields[name] || options.defaultValue,
        onChange: changeHandler,
        error: fieldsErrors[name],
      };
    },
    [fields, fieldsErrors, setFields, validationSchemas, setFieldsErrors],
  );

  return {
    fieldsErrors,
    fields,
    pending,
    controlRegister,
  };
};
