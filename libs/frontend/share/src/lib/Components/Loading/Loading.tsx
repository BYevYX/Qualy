import { FC } from 'react';

import styles from './Loading.module.css';

interface LoadingProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  message?: string;
  gradientColors?: [string, string, string];
}

export const Loading: FC<LoadingProps> = ({
  variant = 'spinner',
  size = 'md',
  className,
  message,
  gradientColors = ['#6366f1', '#8b5cf6', '#ec4899'],
}) => {
  const sizeClass = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
  }[size];

  const renderVariant = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className={styles.dotsContainer}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={styles.dot}
                style={{
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return <div className={`${styles.pulse} ${sizeClass} ${className}`} />;
      case 'gradient':
        return (
          <div
            className={`${styles.gradient} ${sizeClass} ${className}`}
            style={
              {
                '--gradient-start': gradientColors[0],
                '--gradient-mid': gradientColors[1],
                '--gradient-end': gradientColors[2],
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite',
              } as React.CSSProperties
            }
          >
            <div className={styles.gradientInner} />
          </div>
        );

      default:
        return (
          <div
            className={`${styles.spinner} ${sizeClass} ${className}`}
            style={{
              borderBottomColor: 'transparent',
            }}
          />
        );
    }
  };

  return (
    <div className={styles.container}>
      <div role="status" aria-live="polite">
        {renderVariant()}
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};
