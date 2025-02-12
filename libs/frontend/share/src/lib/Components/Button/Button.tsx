import { ButtonHTMLAttributes, FC } from 'react';

import styles from './Button.module.css';

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  children,
  ...atributes
}) => {
  return (
    <button className={`${className} ${styles.button}`} {...atributes}>
      {children}
    </button>
  );
};
