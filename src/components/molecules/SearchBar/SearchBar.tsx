import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  autoFocus?: boolean;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search stores, products...',
  onFocus,
  autoFocus,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 bg-gray-100 rounded-2xl px-3 h-11',
        className
      )}
    >
      <Search size={18} className="text-textSecondary shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={onFocus}
        autoFocus={autoFocus}
        className="flex-1 bg-transparent text-sm text-textPrimary placeholder:text-gray-400 outline-none"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="text-textSecondary p-0.5 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};
