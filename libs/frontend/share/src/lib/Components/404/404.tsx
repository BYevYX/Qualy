'use client';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import styles from './404.module.css';
import { Button } from '../Button/Button';
import { SuperLink } from '../SuperLink/SuperLink';

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
    <section className={containerClassName}>
      <div className={styles.e404}>404</div>
      <div>
        <h1>Page not found</h1>
      </div>
      <div className={styles.buttons}>
        <Button onClick={handleClick}>Go back</Button>
        <SuperLink variant="button" href={'/'}>
          Go home
        </SuperLink>
      </div>
    </section>
  );
};
