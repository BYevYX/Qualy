'use client';
import cn from 'classnames';
import Link from 'next/link';
import { FC, useState } from 'react';

import styles from './MultiButtons.module.css';
import { Button } from '../Button/Button';

interface BaseButtonData {
  id: string | number;
  text: string;
  active?: boolean;
}

interface MultiButtonsProps {
  className?: string;
  variant?: 'withLines' | 'common' | 'noStyle';
  buttonsClassname?: string;
  buttonsData: (
    | (BaseButtonData & {
        onClick: React.MouseEventHandler<HTMLButtonElement>;
      })
    | (BaseButtonData & {
        href: string;
      })
  )[];
}

export const MultiButtons: FC<MultiButtonsProps> = ({
  className,
  buttonsData,
  buttonsClassname,
  variant = 'common',
}) => {
  const [active, setActive] = useState(
    () => buttonsData.find((button) => button.active)?.id,
  );

  return (
    <div className={cn(styles.multiButtons, className)}>
      {buttonsData.map((button, i) => {
        const baseClassName = cn(
          styles.button,
          styles[variant],
          buttonsClassname,
          {
            [styles.active]: active === button.id,
          },
        );

        if ('href' in button) {
          return (
            <Link
              key={button.text + i}
              className={baseClassName}
              href={button.href}
              onClick={() => {
                setActive(button.id);
              }}
            >
              {button.text}
            </Link>
          );
        }

        return (
          <Button
            key={button.text + i}
            className={baseClassName}
            onClick={(e) => {
              button.onClick(e);
              setActive(button.id);
            }}
          >
            {button.text}
          </Button>
        );
      })}
    </div>
  );
};
