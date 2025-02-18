'use client';
import cn from 'classnames';
import Link from 'next/link';
import { FC, useRef } from 'react';

import styles from './MultiButtons.module.css';
import { Button } from '../Button/Button';

interface MultiButtonsProps {
  className?: string;
  buttonsData: (
    | {
        text: string;
        active?: boolean;
        onClick: React.MouseEventHandler<HTMLButtonElement>;
      }
    | {
        text: string;
        active?: boolean;
        href: string;
      }
  )[];
}

export const MultiButtons: FC<MultiButtonsProps> = ({
  className,
  buttonsData,
}) => {
  const active = useRef<string | null>(null);

  return (
    <div className={cn(styles.multiButtons, className)}>
      {buttonsData.map((data, i) => {
        if (data.active) {
          active.current = data.text;
        }

        if ('href' in data) {
          return (
            <Link
              key={i}
              className={cn(styles.button, {
                [styles.active]: active.current === data.text,
              })}
              href={data.href}
              onClick={() => {
                active.current = data.text;
              }}
            >
              {data.text}
            </Link>
          );
        }

        return (
          <Button
            key={i}
            className={cn(styles.button, {
              [styles.active]: active.current === data.text,
            })}
            onClick={(e) => {
              data.onClick(e);
              active.current = data.text;
            }}
          >
            {data.text}
          </Button>
        );
      })}
    </div>
  );
};
