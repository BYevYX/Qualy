'use client';
import cn from 'classnames';
import { motion, AnimatePresence } from 'motion/react';
import { FC, PropsWithChildren, useState, useRef, useId } from 'react';

import styles from './Tooltip.module.css';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps extends PropsWithChildren {
  content: string;
  position?: TooltipPosition;
  className?: string;
}

export const Tooltip: FC<TooltipProps> = ({
  children,
  content,
  className,
  position = 'top',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const id = useId();

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(true);
  };

  const hideTooltip = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const positionClass = styles[`tooltip-${position}`];

  return (
    <div
      className={styles.container}
      onPointerEnter={showTooltip}
      onPointerLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      role="tooltip"
    >
      <div aria-describedby={id}>{children}</div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={id}
            className={cn(styles.tooltip, positionClass, className)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
