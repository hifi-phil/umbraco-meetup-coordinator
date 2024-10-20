"use client";
import {signOut, useSession } from 'next-auth/react';

function Header() {
  const { data } = useSession();

  return (
    <header>
      {data && <div className='flex justify-end gap-4 m-4'>
        <span>Signed in as {data.user!.email}</span>
        <button onClick={() => signOut()}>Sign out</button>
      </div>}
    </header>
  );
}

export default Header;
