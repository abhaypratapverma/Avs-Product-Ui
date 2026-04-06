// src/components/atoms/Chip/Chip.tsx
import { cn } from '../../../utils/cn';

type ChipVariant = 'category' | 'filter';

interface ChipProps {
  label: string;
  selected?: boolean;
  variant?: ChipVariant;
  onClick?: () => void;
  className?: string;
  icon?: string;
}

export function Chip({ label, selected = false, variant = 'category', onClick, className, icon }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-4 py-2 rounded-chip text-sm font-medium transition-all duration-150 whitespace-nowrap active:scale-95',
        variant === 'category'
          ? selected
            ? 'bg-primary text-white shadow-sm'
            : 'bg-white text-gray-700 border border-border hover:border-primary hover:text-primary'
          : selected
            ? 'bg-primary/10 text-primary border border-primary/30'
            : 'bg-white text-gray-600 border border-border hover:border-primary',
        className,
      )}
    >
      {icon && <span className="text-base">{icon}</span>}
      {label}
    </button>
  );
}
