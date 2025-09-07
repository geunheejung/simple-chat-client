import { signUpAction } from '@/app/action/auth';
import { signUpActionState } from '@/app/action/auth.type';
import TextField from '@/app/sign-in/_components/TextField';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

export default function SignUpForm() {
  // 서버 함수와 함께 사용하는 경우, 하이드레이션이 끝나기 전에도 Form 제출에 대한 서버 응답 표시 가능
  const [
    // 마지막으로 제출했을 때 액션에서 반환되는 값
    state,
    formAction,
    pending,
  ] = useActionState(signUpAction, signUpActionState);

  return (
    <form action={formAction} className="space-y-4">
      <TextField
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Your name"
        errorMessage={state.errors.name}
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        errorMessage={state.errors.email}
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        required
        autoComplete="new-password"
        errorMessage={state.errors.password}
      />

      <TextField
        label="Confirm Password"
        name="confirm"
        type="password"
        required
        autoComplete="new-password"
      />

      <div className="flex items-start gap-2">
        <input
          name="tos"
          type="checkbox"
          className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="tos" className="text-xs text-zinc-600">
          I agree to the Terms and Privacy Policy.
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        Create account
      </button>
    </form>
  );
}
