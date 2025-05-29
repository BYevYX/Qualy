import cn from 'classnames';
import { FC } from 'react';

import styles from './StatusComponent.module.css';
import { StatusType } from '../../Types/base';

interface StatusComponentProps extends React.PropsWithChildren {
  className?: string;
  display: boolean;
  type: StatusType;
}

export const StatusComponent: FC<StatusComponentProps> = ({
  className,
  children,
  type,
  display,
}) => {
  if (!display) return;
  return (
    <div className={cn(styles[type], styles.container, className)} role="alert">
      <p className={cn(styles[type], styles.text)}>{children}</p>
    </div>
  );
};
