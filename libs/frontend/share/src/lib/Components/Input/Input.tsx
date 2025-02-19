'use client';
import cn from 'classnames';
import { InputHTMLAttributes, FC, useState } from 'react';
import type { Schema, StringSchema } from 'yup';

import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputStyle?: 'underline' | 'withGlow' | 'common';
  schema?: StringSchema | Schema;
}

export const Input: FC<InputProps> = ({
  className,
  inputStyle = 'common',
  schema,
  ...atributes
}) => {
  const [error, setError] = useState<null | Error>(null);

  const styleVariant = styles[inputStyle];
  const combinedClassName = cn(styles.input, styleVariant, className, {
    [styles.error]: error,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (schema) {
      try {
        schema.validateSync(e.target.value);
        setError(null);
      } catch (e) {
        setError(e as Error);
      }
    }

    atributes.onChange?.(e);
  };

  return (
    <div className={styles.container}>
      <input
        className={combinedClassName}
        data-error={error?.message || null}
        {...atributes}
        onChange={handleChange}
      />
      {error && (
        <div className={styles.errorMessageContainer}>
          <span className={styles.errorMessage}>{error.message}</span>
        </div>
      )}
    </div>
  );
};
