'use client';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import styles from './404.module.css';
import { Button } from '../Button/Button';

interface E404Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const E404: FC<E404Props> = ({ className, size = 'md' }) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  const containerClassName = cn(styles.container, className, styles[size]);

  return (
    <div className={containerClassName}>
      <div className={styles.e404}>404</div>
      <div>
        <span>Page not found</span>
      </div>
      <div className={styles.buttons}>
        <Button onClick={handleClick}>Go back</Button>
        <Button>
          <Link href={'/'}>Go home</Link>
        </Button>
      </div>
    </div>
  );
};
