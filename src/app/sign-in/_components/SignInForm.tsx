import { useFormStatus } from 'react-dom';
import TextField from './TextField';
import { signInAction } from '@/app/action/auth';
import { useActionState } from 'react';
import { signInActionState } from '@/app/action/auth.type';
import { useRouter } from 'next/navigation';

// components/SignInForm.tsx
export default function SignInForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      const res = await signInAction(_prevState, formData);
      router.back();
      return res;
    },
    signInActionState
  );
  const { pending } = useFormStatus();

  return (
    <form action={formAction} className="space-y-4">
      <TextField
        label="Email"
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        errorMessage={state.errors.email}
      />
      <TextField
        label="Password"
        id="password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
        errorMessage={state.errors.password}
      />

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        Sign In
      </button>
    </form>
  );
}
