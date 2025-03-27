import cn from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import styles from './InputWithIcon.module.css';
import { InputProps } from '../../Types/props';
import { Input } from '../Input/Input';

interface InputWithIconProps extends PropsWithChildren, InputProps {
  containerClassname?: string;
}

export const InputWithIcon: FC<InputWithIconProps> = ({
  className,
  containerClassname,
  children,
  ...inputProps
}) => {
  const containerStyles = cn(styles.container, containerClassname);
  const inputStyles = cn(styles.input, className);

  return (
    <div className={containerStyles}>
      <div className={styles.icon}>{children}</div>
      <Input {...inputProps} className={inputStyles} />
    </div>
  );
};
