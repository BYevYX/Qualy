'use client';
import cn from 'classnames';
import { useId, type FC } from 'react';

import styles from './Input.module.css';
import type { InputProps } from '../../Types/props';

export const Input: FC<InputProps> = ({
  className,
  inputStyle = 'common',
  error,
  name,
  label,
  type = 'text',
  ...atributes
}) => {
  const id = useId();
  const errorId = `${id}-error`;

  const styleVariant = styles[inputStyle];
  const combinedClassName = cn(styles.input, styleVariant, className, {
    [styles.error]: error,
  });

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={name}
        className={combinedClassName}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={!!error}
        {...atributes}
      />
      {error && (
        <div className={styles.errorMessageContainer} role="alert">
          <p id={errorId} className={styles.errorMessage}>
            {error}
          </p>
        </div>
      )}
    </div>
  );
};
