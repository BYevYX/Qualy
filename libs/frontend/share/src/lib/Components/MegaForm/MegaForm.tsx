'use client';
import Form, { FormProps } from 'next/form';
import { FC, memo, ReactNode, Suspense, useState } from 'react';
import { StringSchema } from 'yup';

import MegaFormContent from './MegaFormContent/MegaFormContent';
import { MegaFormContext } from './MegaFormContext';
import { FieldsAndErrorsRecord } from '../../Types/contexts';
import { Loading } from '../Loading/Loading';

// Always should be extension of MegaFormContentProps
// Need this because ts dont understand types outside lib if used MegaFormContentProps (need to understand why)
interface MegaFormProps extends Omit<FormProps, 'children'> {
  state?: { error?: string; success?: string } | null;
  validationSchemas: Record<string, StringSchema<string>>;
  fieldsRender: ReactNode | (() => ReactNode);
  submitButtonRender: (props: {
    disabled: boolean;
    isFormErrorDisplay: boolean;
  }) => ReactNode;
}

const MegaFormComponent: FC<MegaFormProps> = ({
  fieldsRender,
  submitButtonRender,
  validationSchemas,
  state,
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
            state={state}
            fieldsRender={fieldsRender}
            submitButtonRender={submitButtonRender}
            validationSchemas={validationSchemas}
          />
        </Form>
      </Suspense>
    </MegaFormContext>
  );
};

export const MegaForm = memo(MegaFormComponent);
