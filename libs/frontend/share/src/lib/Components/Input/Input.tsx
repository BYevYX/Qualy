'use client';
import cn from 'classnames';
import type { FC } from 'react';

import styles from './Input.module.css';
import type { InputProps } from '../../Types/props';

export const Input: FC<InputProps> = ({
  className,
  inputStyle = 'common',
  error,
  name,
  ...atributes
}) => {
  const styleVariant = styles[inputStyle];
  const combinedClassName = cn(styles.input, styleVariant, className, {
    [styles.error]: error,
  });

  return (
    <div className={styles.container}>
      <input
        className={combinedClassName}
        autoComplete={name}
        name={name}
        {...atributes}
      />
      {error && (
        <div className={styles.errorMessageContainer}>
          <span className={styles.errorMessage}>{error}</span>
        </div>
      )}
    </div>
  );
};
