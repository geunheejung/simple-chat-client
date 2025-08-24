import TextInput, { TextInputProps } from '@/app/components/TextInput';

interface TextFieldProps extends TextInputProps {
  label: string;
}

export default function TextField({ label, ...props }: TextFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-zinc-700"
      >
        {label}
      </label>

      <TextInput {...props} />
    </div>
  );
}
