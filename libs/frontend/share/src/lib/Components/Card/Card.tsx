import cn from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import styles from './Card.module.css';

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

export const Card: FC<CardProps> = ({ className, children }) => {
  return <section className={cn(styles.Card, className)}>{children}</section>;
};

export const CardHeader: FC<CardHeaderProps> = ({
  className,
  align = 'left',
  children,
}) => {
  return (
    <header className={cn(styles.CardHeader, styles[align], className)}>
      {children}
    </header>
  );
};

export const CardContent: FC<CardContentProps> = ({
  className,
  align = 'left',
  children,
}) => {
  return (
    <article className={cn(styles.CardContent, styles[align], className)}>
      {children}
    </article>
  );
};

export const CardFooter: FC<CardFooterProps> = ({
  className,
  align = 'left',
  children,
}) => {
  return (
    <footer className={cn(styles.CardFooter, styles[align], className)}>
      {children}
    </footer>
  );
};
