import cn from 'classnames';
import { FC } from 'react';

import styles from './StateComponent.module.css';

interface StateComponentProps extends React.PropsWithChildren {
  className?: string;
  display: boolean;
  stateType: 'error' | 'success';
}

export const StateComponent: FC<StateComponentProps> = ({
  className,
  children,
  stateType,
  display,
}) => {
  if (!display) return;
  return (
    <div className={cn(styles[stateType], styles.container, className)}>
      <span className={cn(styles[stateType], styles.text)}>{children}</span>
    </div>
  );
};
