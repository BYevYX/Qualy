'use client';
import { useEffect, useMemo, useState } from 'react';
import type { FC, ReactNode } from 'react';

import styles from './MegaFormContent.module.css';
import { StatusComponent } from '../../StatusComponent/StatusComponent';
import { useMegaForm } from '../useMegaForm';

interface MegaFormContentProps {
  state?: { error?: string; success?: string } | null;
  fieldsRender: ReactNode | (() => ReactNode);
  submitButtonRender: (props: {
    disabled: boolean;
    isFormErrorDisplay: boolean;
  }) => ReactNode;
}

const MegaFormContent: FC<MegaFormContentProps> = ({
  state,
  fieldsRender,
  submitButtonRender,
}) => {
  const { pending, fieldsErrors } = useMegaForm();

  const [isFormErrorDisplay, setIsFormErrorDisplay] = useState(!!state?.error);

  useEffect(() => {
    setIsFormErrorDisplay(!!state?.error);
  }, [state]);

  const handleChange = async () => {
    setIsFormErrorDisplay(false);
  };

  const disabled = useMemo(
    () =>
      Object.values(fieldsErrors).some((error) => error) ||
      isFormErrorDisplay ||
      pending,
    [fieldsErrors, isFormErrorDisplay, pending],
  );

  return (
    <article onChange={handleChange} className={styles.container}>
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
    </article>
  );
};

export default MegaFormContent;
