'use client';
import Form, { FormProps } from 'next/form';
import {
  FC,
  memo,
  ReactNode,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { StringSchema } from 'yup';

import MegaFormContent from './MegaFormContent/MegaFormContent';
import { MegaFormContext } from './MegaFormContext';
import { ErrorsRecord } from '../../Types/contexts';
import { Loading } from '../Loading/Loading';

// Always should be extension of MegaFormContentProps
// Need this because ts dont understand types outside lib if used MegaFormContentProps (need to understand why)
interface MegaFormProps extends Omit<FormProps, 'children'> {
  state?: { error?: string; success?: string } | null;
  validationSchemas: Record<string, StringSchema<string | undefined>>;
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
  const initialFields = useMemo(() => {
    return Object.keys(validationSchemas).reduce(
      (acc, key) => {
        acc[key] = '';
        return acc;
      },
      {} as Record<string, string>,
    );
  }, [validationSchemas]);

  useEffect(() => {
    setFields((prev) => {
      const newFields = { ...prev };
      Object.keys(validationSchemas).forEach((key) => {
        if (!(key in prev)) newFields[key] = '';
      });
      return newFields;
    });
  }, [validationSchemas]);

  const [fields, setFields] = useState<Record<string, string>>(initialFields);
  const [fieldsErrors, setFieldsErrors] = useState<ErrorsRecord>({});

  return (
    <MegaFormContext
      value={{
        validationSchemas,
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
          />
        </Form>
      </Suspense>
    </MegaFormContext>
  );
};

export const MegaForm = memo(MegaFormComponent);
