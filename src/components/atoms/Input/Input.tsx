import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      containerClassName,
      className,
      id,
      ...rest
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={cn('flex flex-col gap-1', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-textPrimary"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-textSecondary pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full h-12 rounded-2xl border bg-white px-4 text-sm text-textPrimary placeholder:text-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-all',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error
                ? 'border-error focus:ring-red-100'
                : 'border-border hover:border-gray-300',
              className
            )}
            {...rest}
          />
          {rightIcon && (
            <span className="absolute right-3 text-textSecondary">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-error font-medium">{error}</p>}
        {hint && !error && <p className="text-xs text-textSecondary">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
