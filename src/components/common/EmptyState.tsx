// src/components/common/EmptyState.tsx
import { cn } from '../../utils/cn';
import { Button } from '../atoms/Button';

interface EmptyStateProps {
  illustration?: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ illustration, title, subtitle, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-6 text-center', className)}>
      {illustration && (
        <div className="mb-6 text-6xl">{illustration}</div>
      )}
      {!illustration && (
        <div className="w-24 h-24 rounded-full bg-surface flex items-center justify-center mb-6 text-4xl">
          📭
        </div>
      )}
      <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
      {subtitle && (
        <p className="text-muted text-sm mt-2 leading-relaxed max-w-xs">{subtitle}</p>
      )}
      {action && (
        <div className="mt-6">
          <Button variant="primary" onClick={action.onClick}>
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}
