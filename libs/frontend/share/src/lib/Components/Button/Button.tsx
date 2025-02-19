import cn from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';

import styles from './Button.module.css';

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  children,
  ...atributes
}) => {
  const buttonClassName = cn(styles.button, className);

  return (
    <button className={buttonClassName} {...atributes}>
      {children}
    </button>
  );
};
