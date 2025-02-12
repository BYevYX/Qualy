import Image, { type ImageProps } from 'next/image';
import type { FC, InputHTMLAttributes } from 'react';

import styles from './InputWithIcon.module.css';
import { Input } from '../Input/Input';

interface InputWithIconProps {
  className: string;
  imageAtributes: ImageProps;
  inputAtributes: InputHTMLAttributes<HTMLInputElement>;
}

export const ImageWithIcon: FC<InputWithIconProps> = ({
  className,
  imageAtributes,
  inputAtributes,
}) => {
  return (
    <div className={`${styles} ${className}`}>
      <Image {...imageAtributes} />
      <Input {...inputAtributes} />
    </div>
  );
};
