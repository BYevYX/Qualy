import cn from 'classnames';
import Image, { StaticImageData, type ImageProps } from 'next/image';
import type { FC } from 'react';

import styles from './InputWithIcon.module.css';
import { Input } from '../Input/Input';
import { InputProps } from 'src/types';

interface InputWithIconBaseProps {
  className?: string;
  icon: StaticImageData;
  alt: string;
  inputAtributes?: InputProps;
  imageAtributes?: Partial<ImageProps>;
}

export const InputWithIcon: FC<InputWithIconBaseProps> = ({
  className,
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
      <Input {...inputAtributes} className={inputStyles} />
    </div>
  );
};
