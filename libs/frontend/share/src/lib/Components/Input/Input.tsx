import { InputHTMLAttributes, FC } from 'react';

import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputStyle?: 'underline' | 'withGlow' | 'common';
}

export const Input: FC<InputProps> = ({
  className,
  inputStyle = 'common',
  ...atributes
}) => {
  const styleVariant = styles[inputStyle];
  const combinedClassName = `${className || ''} ${styles.input} ${styleVariant}`;

  return <input className={combinedClassName} {...atributes} />;
};
