type InputFieldType = 'text' | 'email' | 'password' | 'number';

export type InputProps = {
  type: InputFieldType;
  label: string;
  placeholder?: string;
  isInvalid?: boolean;
  errorMessage?: string;
}
