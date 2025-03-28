'use client';
import { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import type { MegaFormContentProps } from 'src/lib/Types/props';

import styles from './MegaFormContent.module.css';
import { StateComponent } from '../../StateComponent/StateComponent';
import { useMegaForm } from '../useMegaForm';

const MegaFormContent: FC<MegaFormContentProps> = ({
  state,
  validationSchemas,
  inputRender,
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
      {typeof inputRender === 'function' ? inputRender() : inputRender}

      <StateComponent
        display={isFormErrorDisplay || !!state?.success}
        className={styles.stateComponent}
        stateType={isFormErrorDisplay ? 'error' : 'success'}
      >
        {isFormErrorDisplay ? state?.error : state?.success}
      </StateComponent>

      {submitButtonRender({
        disabled,
        isFormErrorDisplay: isFormErrorDisplay,
      })}
    </div>
  );
};

export default MegaFormContent;
