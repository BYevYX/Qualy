import Image, { StaticImageData } from 'next/image';
import { FC, PropsWithChildren, ReactNode } from 'react';

export const EmailTemplate: FC<
  PropsWithChildren<{
    imageSrc?: string | StaticImageData;
    text: {
      header?: string | ReactNode;
      greeting: string | ReactNode;
      content: string | ReactNode;
      additional?: string | ReactNode;
      linkExpire?: string | ReactNode;
    };
  }>
> = ({ imageSrc, text, children }) => {
  return (
    <div>
      {imageSrc && <Image src={imageSrc} alt="Qualy image for email" />}
      <h1>{text.header}</h1>
      <section
        style={{
          whiteSpace: 'pre-wrap',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div>{text.greeting}</div>
        <div>{text.content}</div>
        {children}
        <div>{text.additional}</div>
        <div>
          {text.linkExpire} If you didn&apos;t request this email, please ignore
          it
        </div>
        <div>Thank you for choosing Qualy!{'\n\n'}Best regards, Qualy Team</div>
      </section>
    </div>
  );
};
