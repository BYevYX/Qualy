'use client';

import { useState } from 'react';
import type { FC } from 'react';

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
    <div className="relative flex h-12 w-64 items-center rounded-full bg-gray-200 p-1">
      {/* Скользящий фон */}
      <div
        className={`absolute h-full w-1/2 rounded-full bg-white shadow-md transition-transform duration-300 ${
          isFirst ? 'translate-x-0' : 'translate-x-full'
        }`}
      />

      <button
        className={`relative z-10 w-1/2 text-center transition-colors duration-300 ${
          isFirst ? 'text-black' : 'text-gray-500'
        }`}
        onClick={(e) => {
          setIsFirst(true);
          handleToggle?.(e);
          handleFirst?.(e);
        }}
      >
        {firstButonText}
      </button>

      <button
        className={`relative z-10 w-1/2 text-center transition-colors duration-300 ${
          !isFirst ? 'text-black' : 'text-gray-500'
        }`}
        onClick={(e) => {
          setIsFirst(false);
          handleToggle?.(e);
          handleSecond?.(e);
        }}
      >
        {secondButonText}
      </button>
    </div>
  );
};
