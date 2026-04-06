import React from 'react';
import { cn } from '@/utils/cn';
import type { ButtonProps } from './Button.types';

const variantClasses = {
  primary:
    'bg-primary text-white hover:bg-primary-700 active:scale-[0.98] shadow-sm',
  secondary:
    'bg-primary-50 text-primary hover:bg-primary-100 active:scale-[0.98]',
  ghost:
    'bg-transparent text-primary hover:bg-primary-50 active:scale-[0.98]',
  outline:
    'bg-transparent border border-primary text-primary hover:bg-primary-50 active:scale-[0.98]',
  danger:
    'bg-error text-white hover:bg-red-700 active:scale-[0.98]',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm rounded-xl h-8',
  md: 'px-4 py-2.5 text-sm rounded-2xl h-10',
  lg: 'px-6 py-3.5 text-base rounded-2xl h-12',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className,
  disabled,
  ...rest
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 select-none',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        (disabled || isLoading) && 'opacity-60 cursor-not-allowed pointer-events-none',
        className
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};
