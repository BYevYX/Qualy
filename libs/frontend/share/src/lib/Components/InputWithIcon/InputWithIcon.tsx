import cn from 'classnames';
import Image, { StaticImageData, type ImageProps } from 'next/image';
import type { FC, InputHTMLAttributes } from 'react';
import { Schema, StringSchema } from 'yup';

import styles from './InputWithIcon.module.css';
import { Input } from '../Input/Input';

interface InputWithIconBaseProps {
  className?: string;
  schema?: StringSchema | Schema;
  icon: StaticImageData;
  alt: string;
  inputAtributes?: InputHTMLAttributes<HTMLInputElement>;
  imageAtributes?: Partial<ImageProps>;
}

export const InputWithIcon: FC<InputWithIconBaseProps> = ({
  className,
  schema,
  icon,
  alt,
  inputAtributes,
  imageAtributes,
}) => {
  const containerStyles = cn(styles.container, className);
  const imageStyles = cn(styles.image, imageAtributes?.className);
  const inputStyles = cn(styles.input, inputAtributes?.className);

  return (
    <div className={containerStyles}>
      <Image
        className={imageStyles}
        src={icon}
        alt={alt}
        height={30}
        width={30}
        {...imageAtributes}
      />
      <Input {...inputAtributes} className={inputStyles} schema={schema} />
    </div>
  );
};
