// src/components/atoms/Input/Input.tsx
import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftElement, rightElement, className, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftElement && (
            <div className="absolute left-3 flex items-center pointer-events-none text-muted">
              {leftElement}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              'w-full bg-blue-50/50 border border-transparent rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-muted/70 transition-all duration-150',
              'focus:outline-none focus:border-primary focus:bg-white focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]',
              error && 'border-danger focus:border-danger focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]',
              leftElement && 'pl-10',
              rightElement && 'pr-10',
              className,
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 flex items-center text-muted">
              {rightElement}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-danger font-medium">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
