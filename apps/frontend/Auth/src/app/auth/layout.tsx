import Image from 'next/image';

import shely from 'public/images/shely.jpeg';
import { LayoutParams } from 'src/features/common/model/types';
import AuthMultiChoose from 'src/features/common/ui/AuthMultiChoose';
import OAuth from 'src/features/common/ui/OAuth';

export default function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LayoutParams;
}) {
  return (
    <div className="relative flex justify-around">
      <div className="flex">
        <Image
          src={shely}
          priority
          alt="camera image"
          className="box-border h-auto max-h-screen w-full max-w-full"
        />
      </div>
      <AuthMultiChoose />

      <div className="flex flex-col self-center justify-self-center">
        <h1 className="p-10 text-center text-2xl text-white">
          Hello, Welcome!
        </h1>

        {children}
        <OAuth params={params} />
      </div>
    </div>
  );
}
