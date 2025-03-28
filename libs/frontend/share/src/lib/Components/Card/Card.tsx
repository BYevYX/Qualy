import cn from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import styles from './Card.module.css';

const getComponent = <T extends CardProps>(name: string): FC<T> => {
  const component = ({
    children,
    className,
    align = 'left',
  }: CardHeaderProps) => {
    return (
      <div className={cn(styles[name], styles[align], className)}>
        {children}
      </div>
    );
  };

  component.displayName = name;
  return component;
};

interface CardProps extends PropsWithChildren {
  className?: string;
}
interface CardHeaderProps extends CardProps {
  align?: 'left' | 'center' | 'right';
}
interface CardContentProps extends CardHeaderProps {
  align?: Exclude<CardHeaderProps['align'], 'right'>;
}
type CardFooterProps = CardHeaderProps;

export const Card = getComponent<CardProps>('Card');
export const CardHeader = getComponent<CardHeaderProps>('CardHeader');
export const CardContent = getComponent<CardContentProps>('CardContent');
export const CardFooter = getComponent<CardFooterProps>('CardFooter');
