import TextField from '@/app/sign-in/_components/TextField';

export default function SignUpForm() {
  return (
    <form className="space-y-4">
      <TextField
        label="Name"
        id="name"
        type="text"
        autoComplete="name"
        placeholder="Your name"
      />

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
        autoComplete="new-password"
      />

      <TextField
        label="Confirm Password"
        id="confirm"
        type="password"
        required
        autoComplete="new-password"
      />

      <div className="flex items-start gap-2">
        <input
          id="tos"
          type="checkbox"
          className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="tos" className="text-xs text-zinc-600">
          I agree to the Terms and Privacy Policy.
        </label>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Create account
      </button>
    </form>
  );
}
