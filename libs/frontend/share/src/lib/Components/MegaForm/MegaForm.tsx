'use client';
import Form, { FormProps } from 'next/form';
import { FC, memo, ReactNode, Suspense, useState } from 'react';
import { StringSchema } from 'yup';

import MegaFormContent from './MegaFormContent/MegaFormContent';
import { MegaFormContext } from './MegaFormContext';
import { Loading } from '../Loading/Loading';
import { FieldsAndErrorsRecord } from 'src/types';

interface MegaFormProps extends Omit<FormProps, 'children'> {
  formError: { error?: string } | null | undefined;
  validationSchemas: Record<string, StringSchema<string>>;
  inputRender: ReactNode | (() => ReactNode);
  submitButtonRender: (props: {
    disabled: boolean;
    isFormErrorDisplay: boolean;
  }) => ReactNode;
}

const MegaFormComponent: FC<MegaFormProps> = ({
  inputRender,
  submitButtonRender,
  formError,
  validationSchemas,
  ...formProps
}) => {
  const [fields, setFields] = useState<FieldsAndErrorsRecord>({});
  const [fieldsErrors, setFieldsErrors] = useState<FieldsAndErrorsRecord>({});

  return (
    <MegaFormContext
      value={{
        fields,
        setFields,
        fieldsErrors,
        setFieldsErrors,
      }}
    >
      <Suspense fallback={<Loading />}>
        <Form {...formProps}>
          <MegaFormContent
            formError={formError}
            inputRender={inputRender}
            submitButtonRender={submitButtonRender}
            validationSchemas={validationSchemas}
          />
        </Form>
      </Suspense>
    </MegaFormContext>
  );
};

export const MegaForm = memo(MegaFormComponent);
