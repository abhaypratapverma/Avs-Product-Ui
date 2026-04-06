// src/components/atoms/Button/Button.tsx
import { cn } from '../../../utils/cn';
import type { ButtonProps } from './Button.types';

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-blue-700 active:scale-[0.98] shadow-sm',
  outline: 'border border-primary text-primary hover:bg-blue-50 active:scale-[0.98]',
  ghost:   'text-primary hover:bg-blue-50 active:scale-[0.98]',
  danger:  'bg-danger text-white hover:bg-red-700 active:scale-[0.98]',
  success: 'bg-success text-white hover:bg-green-700 active:scale-[0.98]',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3.5 text-base rounded-2xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
