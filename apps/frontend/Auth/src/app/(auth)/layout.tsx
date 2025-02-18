import Image from 'next/image';

import shely from 'public/images/shely.jpeg';
import AuthMultiChoose from 'src/features/between/ui/AuthMultiChoose';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex justify-around">
      <div className="flex">
        <Image
          src={shely}
          alt="camera image"
          className="box-border h-auto max-h-screen w-full max-w-full"
        />
      </div>
      <AuthMultiChoose />

      <div className="self-center justify-self-center">{children}</div>
    </div>
  );
}
