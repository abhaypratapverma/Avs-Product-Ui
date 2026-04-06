// src/components/molecules/SearchBar/SearchBar.tsx
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onFilter?: () => void;
  className?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search stores, products...',
  onFilter,
  className,
  autoFocus,
}: SearchBarProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-9 pr-9 py-2.5 bg-white border border-border rounded-xl text-sm placeholder:text-muted/80 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(37,99,235,0.08)] transition-all"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="w-4 h-4 text-muted" />
          </button>
        )}
      </div>
      {onFilter && (
        <button
          onClick={onFilter}
          className="w-10 h-10 bg-white border border-border rounded-xl flex items-center justify-center flex-shrink-0 hover:border-primary transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-gray-600" />
        </button>
      )}
    </div>
  );
}
