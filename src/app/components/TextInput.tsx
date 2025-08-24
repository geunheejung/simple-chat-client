export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const TextInput = (props: TextInputProps) => {
  return (
    <input
      {...props}
      className="block w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  );
};

export default TextInput;
