import Image from 'next/image';

import camera from '../../../public/images/shely.jpeg';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-around">
      <div className="flex">
        <Image
          src={camera}
          alt="camera image"
          className="h-auto max-h-screen w-full max-w-full"
        />
      </div>
      <div className="flex h-full flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
