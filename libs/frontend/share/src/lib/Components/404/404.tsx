import cn from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';

import styles from './404.module.css';

interface e404Props {
  className?: string;
  variant?: 'common' | 'noStyle';
}

export const Button: FC<e404Props> = ({
  className,
  variant = 'common',
  ...atributes
}) => {
  const e404ClassName = cn(styles.e404, styles[variant], className);

  return (
    <div className={e404ClassName} {...atributes}>

    </div>
  );
};
