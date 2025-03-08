import { FC } from 'react';

import { auth, signOut } from 'src/auth';

const MainPage: FC = async () => {
  const sessionPromise = auth();
  const session = await sessionPromise;
  return (
    <div>
      {JSON.stringify(session)}
      <button
        className="text-white"
        onClick={async () => {
          'use server';
          await signOut();
        }}
      >
        logout
      </button>
    </div>
  );
};

export default MainPage;
