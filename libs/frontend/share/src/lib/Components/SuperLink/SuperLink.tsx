import cn from 'classnames';
import Link from 'next/link';
import type { FC } from 'react';

import styles from './SuperLink.module.css';

interface SuperLinkProps extends React.ComponentProps<typeof Link> {
  variant?: 'common' | 'button';
  className?: string;
}

export const SuperLink: FC<SuperLinkProps> = ({
  className,
  children,
  variant = 'common',
  ...atributes
}) => {
  const SuperLinkClassName = cn(styles.superLink, styles[variant], className);

  return (
    <Link className={SuperLinkClassName} {...atributes}>
      {children}
    </Link>
  );
};
