// src/components/atoms/Badge/Badge.tsx
import { cn } from '../../../utils/cn';

type BadgeVariant = 'sponsored' | 'featured' | 'open' | 'closed' | 'cod' | 'new' | 'deal';

interface BadgeProps {
  variant: BadgeVariant;
  className?: string;
}

const config: Record<BadgeVariant, { label: string; cls: string }> = {
  sponsored: { label: 'Sponsored', cls: 'bg-secondary/10 text-secondary border border-secondary/20' },
  featured:  { label: 'Featured',  cls: 'bg-primary/10 text-primary border border-primary/20' },
  open:      { label: 'Open',      cls: 'bg-success/10 text-success border border-success/20' },
  closed:    { label: 'Closed',    cls: 'bg-muted/10 text-muted border border-muted/20' },
  cod:       { label: 'COD',       cls: 'bg-amber-50 text-amber-700 border border-amber-200' },
  new:       { label: 'New',       cls: 'bg-purple-50 text-purple-700 border border-purple-200' },
  deal:      { label: 'DEAL',      cls: 'bg-success text-white' },
};

export function Badge({ variant, className }: BadgeProps) {
  const { label, cls } = config[variant];
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-chip text-[10px] font-semibold uppercase tracking-wide',
        cls,
        className,
      )}
    >
      {label}
    </span>
  );
}
