import cn from 'classnames';
import { FC } from 'react';

import styles from './ErrorComponent.module.css';

interface ErrorComponentProps extends React.PropsWithChildren {
  className?: string;
  display: boolean;
}

export const ErrorComponent: FC<ErrorComponentProps> = ({
  className,
  children,
  display,
}) => {
  if (!display) return;
  return (
    <div className={cn(styles.errorContainer, className)}>
      <span className={styles.text}>{children}</span>
    </div>
  );
};
