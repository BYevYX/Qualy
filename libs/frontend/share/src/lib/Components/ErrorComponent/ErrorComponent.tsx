'use client';
import cn from 'classnames';
import { FC, useLayoutEffect, useState } from 'react';

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
  const [needDisplay, setNeedDisplay] = useState(() => display);

  useLayoutEffect(() => {
    if (needDisplay !== display && needDisplay) {
      setTimeout(() => setNeedDisplay(display), 300);
    }
  }, [display, needDisplay]);

  if (!needDisplay) return;

  return (
    <div
      className={cn(styles.errorContainer, className, {
        [styles.closing]: !display,
      })}
    >
      <span className={styles.text}>{children}</span>
    </div>
  );
};
