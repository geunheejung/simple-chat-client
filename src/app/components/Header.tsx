import { auth, signOut } from '@/auth';
import Link from 'next/link';

export default async function Header() {
  const session = await auth();

  return (
    <header>
      {session ? (
        <form
          action={async () => {
            'use server';
            await signOut({ redirect: true });
          }}
        >
          <button type="submit">Sign Out</button>
        </form>
      ) : (
        <>
          <Link href="/sign-in">Sign In</Link>
          <Link href="/sign-up">Sign Up</Link>
        </>
      )}
    </header>
  );
}
