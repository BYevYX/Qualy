'use client';

import { useState } from 'react';
import type { FC } from 'react';

import styles from './Toggle.module.css';
import { Button } from '../Button/Button';

interface BaseProps {
  firstButonText: string;
  secondButonText: string;
}

type ToggleProps =
  | (BaseProps & {
      handleToggle: React.MouseEventHandler<HTMLButtonElement>;
      handleFirst?: never;
      handleSecond?: never;
    })
  | (BaseProps & {
      handleFirst: React.MouseEventHandler<HTMLButtonElement>;
      handleSecond: React.MouseEventHandler<HTMLButtonElement>;
      handleToggle?: never;
    });

export const Toggle: FC<ToggleProps> = ({
  firstButonText,
  secondButonText,
  handleToggle,
  handleFirst,
  handleSecond,
}) => {
  const [isFirst, setIsFirst] = useState(true);

  return (
    <div className={`${styles.root} ${isFirst && styles.root_active}`}>
      <Button
        className={`${styles.first} ${isFirst && styles.first_active}`}
        onClick={(e) => {
          if (isFirst) return;

          setIsFirst(true);
          handleToggle?.(e);
          handleFirst?.(e);
        }}
      >
        {firstButonText}
      </Button>
      <Button
        className={`${styles.second} ${!isFirst && styles.second_active}`}
        onClick={(e) => {
          if (!isFirst) return;

          setIsFirst(false);
          handleToggle?.(e);
          handleSecond?.(e);
        }}
      >
        {secondButonText}
      </Button>
    </div>
  );
};
