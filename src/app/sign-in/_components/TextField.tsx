import TextInput, { TextInputProps } from '@/app/components/TextInput';

interface TextFieldProps extends TextInputProps {
  label: string;
  errorMessage?: string | string[];
}

export default function TextField({
  label,
  errorMessage,
  ...props
}: TextFieldProps) {
  const displayErrorMsg = Array.isArray(errorMessage)
    ? errorMessage[0]
    : errorMessage;
  return (
    <div className="space-y-1.5 flex flex-col gap-1">
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-zinc-700"
      >
        {label}
      </label>

      <TextInput {...props} />
      {displayErrorMsg && (
        <p className="text-red-500 text-sm">{displayErrorMsg}</p>
      )}
    </div>
  );
}
