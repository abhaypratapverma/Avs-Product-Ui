// src/components/atoms/Avatar/Avatar.tsx
import { cn } from '../../../utils/cn';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-[60px] h-[60px] text-base',
  xl: 'w-20 h-20 text-lg',
};

function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

export function Avatar({ src, name = '', size = 'md', className }: AvatarProps) {
  return (
    <div
      className={cn(
        'rounded-full overflow-hidden flex items-center justify-center bg-primary/10 text-primary font-semibold flex-shrink-0',
        sizeClasses[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{getInitials(name) || '?'}</span>
      )}
    </div>
  );
}
