'use client';
import { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import type { MegaFormContentProps } from 'src/lib/Types/props';

import styles from './MegaFormContent.module.css';
import { ErrorComponent } from '../../ErrorComponent/ErrorComponent';
import { useMegaForm } from '../useMegaForm';

const MegaFormContent: FC<MegaFormContentProps> = ({
  formError,
  validationSchemas,
  inputRender,
  submitButtonRender,
}) => {
  const { pending, fieldsErrors, setFieldsErrors, fields, setFields } =
    useMegaForm();

  const [isFormErrorDisplay, setIsFormErrorDisplay] = useState(
    !!formError?.error,
  );

  useEffect(() => {
    setIsFormErrorDisplay(!!formError?.error);
  }, [formError]);

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
      {typeof inputRender === 'function' ? inputRender() : inputRender}

      <ErrorComponent
        display={isFormErrorDisplay}
        className={styles.errorComponent}
      >
        {formError?.error}
      </ErrorComponent>

      {submitButtonRender({
        disabled,
        isFormErrorDisplay: isFormErrorDisplay,
      })}
    </div>
  );
};

export default MegaFormContent;
