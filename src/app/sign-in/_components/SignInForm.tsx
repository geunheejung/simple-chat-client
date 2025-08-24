import TextField from './TextField';

// components/SignInForm.tsx
export default function SignInForm() {
  return (
    <form className="space-y-4">
      <TextField
        label="Email"
        id="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
      />
      <TextField
        label="Password"
        id="password"
        type="password"
        required
        autoComplete="current-password"
      />

      <button
        type="submit"
        className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Sign In
      </button>
    </form>
  );
}
