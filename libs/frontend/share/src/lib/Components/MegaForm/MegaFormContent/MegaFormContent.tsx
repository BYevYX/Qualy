'use client';
import { useEffect, useMemo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import type { StringSchema } from 'yup';

import styles from './MegaFormContent.module.css';
import { StatusComponent } from '../../StatusComponent/StatusComponent';
import { useMegaForm } from '../useMegaForm';

interface MegaFormContentProps {
  state?: { error?: string; success?: string } | null;
  validationSchemas: Record<string, StringSchema<string>>;
  fieldsRender: ReactNode | (() => ReactNode);
  submitButtonRender: (props: {
    disabled: boolean;
    isFormErrorDisplay: boolean;
  }) => ReactNode;
}

const MegaFormContent: FC<MegaFormContentProps> = ({
  state,
  validationSchemas,
  fieldsRender,
  submitButtonRender,
}) => {
  const { pending, fieldsErrors, setFieldsErrors, fields, setFields } =
    useMegaForm();

  const [isFormErrorDisplay, setIsFormErrorDisplay] = useState(!!state?.error);

  useEffect(() => {
    setIsFormErrorDisplay(!!state?.error);
  }, [state]);

  const disabled = useMemo(
    () =>
      Object.values(fieldsErrors).some((error) => error) ||
      isFormErrorDisplay ||
      pending,
    [fieldsErrors, isFormErrorDisplay, pending],
  );

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormErrorDisplay(false);
    const { name, value } = e.target;
    const newFormData = { ...fields, [name]: value };

    try {
      await validationSchemas[name].validate(value, { context: newFormData });
      setFieldsErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    } catch (err) {
      setFieldsErrors((prev) => ({
        ...prev,
        [name]: (err as Error).message,
      }));
    }

    setFields(newFormData);
  };

  return (
    <div onChange={handleChange} className={styles.container}>
      {typeof fieldsRender === 'function' ? fieldsRender() : fieldsRender}

      <StatusComponent
        display={isFormErrorDisplay || !!state?.success}
        className={styles.statusComponent}
        type={isFormErrorDisplay ? 'error' : 'success'}
      >
        {isFormErrorDisplay ? state?.error : state?.success}
      </StatusComponent>

      {submitButtonRender({
        disabled,
        isFormErrorDisplay: isFormErrorDisplay,
      })}
    </div>
  );
};

export default MegaFormContent;
