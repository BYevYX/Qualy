import cn from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';

import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'common' | 'icon' | 'additional' | 'noStyle';
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  type = 'button',
  variant = 'common',
  ...atributes
}) => {
  const buttonClassName = cn(styles.button, styles[variant], className);

  if (
    process.env.NODE_ENV === 'development' &&
    variant === 'icon' &&
    !atributes['aria-label']
  ) {
    console.warn('Icon buttons must have an aria-label for accessibility.');
  }

  return (
    <button
      type={type}
      className={buttonClassName}
      aria-disabled={!!atributes.disabled}
      {...atributes}
    >
      {children}
    </button>
  );
};
