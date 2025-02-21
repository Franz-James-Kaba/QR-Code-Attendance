type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonProps = {
  type: ButtonType;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  loadingText?: string;
  ariaLabel?: string;
}
