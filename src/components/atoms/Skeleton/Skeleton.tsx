// src/components/atoms/Skeleton/Skeleton.tsx
import { cn } from '../../../utils/cn';

type SkeletonShape = 'line' | 'circle' | 'card' | 'banner';

interface SkeletonProps {
  shape?: SkeletonShape;
  width?: string;
  height?: string;
  className?: string;
  lines?: number; // for 'line' shape, how many lines to show
}

export function Skeleton({ shape = 'line', width, height, className, lines = 1 }: SkeletonProps) {
  if (shape === 'line' && lines > 1) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn('skeleton rounded', i === lines - 1 ? 'w-2/3' : 'w-full', className)}
            style={{ height: height ?? '14px', width: i === lines - 1 ? undefined : width }}
          />
        ))}
      </div>
    );
  }

  const shapeStyles: Record<SkeletonShape, string> = {
    line:   `rounded`,
    circle: `rounded-full`,
    card:   `rounded-card`,
    banner: `rounded-card`,
  };

  const defaultHeight: Record<SkeletonShape, string> = {
    line:   '14px',
    circle: width ?? '48px',
    card:   '200px',
    banner: '180px',
  };

  return (
    <div
      className={cn('skeleton', shapeStyles[shape], className)}
      style={{
        width:  shape === 'circle' ? (width ?? '48px') : (width ?? '100%'),
        height: height ?? defaultHeight[shape],
      }}
    />
  );
}
