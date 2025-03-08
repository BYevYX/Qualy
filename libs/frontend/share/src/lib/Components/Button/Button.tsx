import cn from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';

import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'common' | 'noStyle';
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  variant = 'common',
  ...atributes
}) => {
  const buttonClassName = cn(styles.button, styles[variant], className);

  return (
    <button className={buttonClassName} {...atributes}>
      {children}
    </button>
  );
};
