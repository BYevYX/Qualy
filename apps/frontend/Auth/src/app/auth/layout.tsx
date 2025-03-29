import Image from 'next/image';

import shely from 'public/images/shely.jpeg';
import AuthMultiChoose from 'src/features/common/ui/AuthMultiChoose';
import { LayoutParams } from 'src/widjets/share/model/types';
import OAuth from 'src/widjets/share/ui/OAuth';

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
