import { E404 } from '@qualy/front-share/client';
import Image from 'next/image';
import { FC } from 'react';

import reels from 'public/images/reels.webp';

const NotFound: FC = () => {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <Image
        src={reels}
        alt="Reels"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative">
        <E404 size="lg" />
      </div>
    </div>
  );
};

export default NotFound;
