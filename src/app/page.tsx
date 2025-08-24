import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h2>Main Page</h2>
      <Link href="/sign-in">Sign In</Link>
      <Link href="/sign-up">Sign U1sp</Link>
    </div>
  );
}
