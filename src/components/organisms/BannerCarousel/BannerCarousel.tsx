// src/components/organisms/BannerCarousel/BannerCarousel.tsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';
import { Skeleton } from '../../atoms/Skeleton';
import type { Banner } from '../../../types/store.types';

interface BannerCarouselProps {
  banners: Banner[];
  isLoading?: boolean;
}

export function BannerCarousel({ banners, isLoading = false }: BannerCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startXRef = useRef<number>(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % banners.length);
  }, [banners.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (isPaused || banners.length <= 1) return;
    timerRef.current = setTimeout(next, 4000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, isPaused, next, banners.length]);

  if (isLoading) {
    return <Skeleton shape="banner" className="mx-0 rounded-card" />;
  }

  if (!banners.length) return null;

  const validCurrent = current < banners.length ? current : 0;
  const banner = banners[validCurrent];
  if (!banner) return null;

  return (
    <div
      className="relative overflow-hidden rounded-card"
      onTouchStart={(e) => { startXRef.current = e.touches[0].clientX; setIsPaused(true); }}
      onTouchEnd={(e) => {
        const diff = startXRef.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); }
        setIsPaused(false);
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="relative w-full h-[180px]"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          <img
            src={banner.imageUrl}
            alt={banner.storeName}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            {banner.isSponsored && (
              <span className="text-[9px] font-semibold text-white/70 bg-black/30 px-2 py-0.5 rounded mb-1 inline-block">SPONSORED</span>
            )}
            {banner.tagLine ? (
              <p className="text-white font-bold text-sm leading-tight drop-shadow">{banner.tagLine}</p>
            ) : null}
            {banner.storeName ? (
              <p className="text-white/80 text-xs mt-0.5">{banner.storeName}</p>
            ) : null}
          </div>
          {/* Featured Store badge */}
          <div className="absolute top-2 left-2">
            <span className="text-[9px] font-semibold bg-primary text-white px-2 py-0.5 rounded uppercase">Featured Store</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute bottom-2 right-3 flex items-center gap-1">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn('carousel-dot', i === current && 'active')}
          />
        ))}
      </div>
    </div>
  );
}
