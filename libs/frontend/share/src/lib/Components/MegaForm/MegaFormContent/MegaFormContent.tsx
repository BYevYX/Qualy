'use client';
import { useMemo, useRef, memo } from 'react';
import type { FC } from 'react';

import styles from './MegaFormContent.module.css';
import { ErrorComponent } from '../../ErrorComponent/ErrorComponent';
import { useMegaForm } from '../useMegaForm';
import type { MegaFormContentProps } from 'src/lib/Types/props';

const MegaFormContent: FC<MegaFormContentProps> = ({
  formError,
  validationSchemas,
  inputRender,
  submitButtonRender,
}) => {
  const { pending, fieldsErrors, setFieldsErrors, fields, setFields } =
    useMegaForm();

  const isFormErrorDisplay = useRef(!!formError);

  const disabled = useMemo(
    () =>
      Object.values(fieldsErrors).some((error) => error) ||
      isFormErrorDisplay.current ||
      pending,
    [fieldsErrors, isFormErrorDisplay, pending],
  );

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    isFormErrorDisplay.current = false;
    const { name, value } = e.target;
    const newFormData = { ...fields, [name]: value };

    try {
      await validationSchemas[name].validate(value);
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
        display={isFormErrorDisplay.current}
        className={styles.errorComponent}
      >
        {formError}
      </ErrorComponent>

      {submitButtonRender({
        disabled,
        isFormErrorDisplay: isFormErrorDisplay.current,
      })}
    </div>
  );
};

export default memo(MegaFormContent);
