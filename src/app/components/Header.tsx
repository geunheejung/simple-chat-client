import { auth, signOut } from '@/auth';
import Link from 'next/link';
import Notification from './Notification';

export default async function Header() {
  const session = await auth();

  return (
    <header
      className="
      sticky top-0 z-40 w-full
      border-b border-zinc-200/60 bg-white/70 backdrop-blur
      dark:border-zinc-800 dark:bg-zinc-950/60
    "
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2"
          aria-label="Go to home"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 text-white shadow-sm ring-1 ring-zinc-800 group-hover:scale-105 transition dark:bg-white dark:text-zinc-900 dark:ring-zinc-200">
            N
          </span>
          <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Notifier
          </span>
        </Link>

        {/* (선택) 가운데 네비게이션 */}
        {/* <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-300">
          <Link href="/docs" className="hover:text-zinc-900 dark:hover:text-white transition">Docs</Link>
          <Link href="/pricing" className="hover:text-zinc-900 dark:hover:text-white transition">Pricing</Link>
        </nav> */}

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 알림 버튼 */}
          <Notification />

          {session ? (
            <form
              action={async () => {
                'use server';
                await signOut({ redirect: true });
              }}
            >
              <button
                type="submit"
                className="
                  inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium
                  bg-zinc-900 text-white shadow-sm ring-1 ring-zinc-800
                  hover:bg-zinc-800 active:scale-[0.98] transition
                  dark:bg-zinc-100 dark:text-zinc-900 dark:ring-zinc-300 dark:hover:bg-white
                "
              >
                Sign Out
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/sign-in"
                className="
                  inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium
                  border border-zinc-300 text-zinc-800
                  hover:bg-zinc-50 transition
                  dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900
                "
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="
                  inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium
                  bg-blue-600 text-white shadow-sm
                  hover:bg-blue-500 active:scale-[0.98] transition
                  dark:bg-blue-500 dark:hover:bg-blue-400
                "
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
