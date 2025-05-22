import Image from 'next/image';

import shely from 'public/images/shely.jpeg';
import { LayoutParams } from 'src/features/shared/model/types';
import AuthMultiChoose from 'src/features/shared/ui/AuthMultiChoose';
import OAuth from 'src/features/shared/ui/OAuth';

export default async function AuthLayout({
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
