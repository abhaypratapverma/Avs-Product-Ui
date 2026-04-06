import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeDetailPath } from '@/constants/routes';
import type { Banner } from '@/types/store.types';

interface BannerCarouselProps {
  banners: Banner[];
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const navigate = useNavigate();

  const total = banners.length;

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, total]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
    }
    setIsDragging(false);
  };

  // Mouse drag handlers (desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
    }
    setIsDragging(false);
  };

  const handleBannerClick = (banner: Banner) => {
    if (banner.storeId) {
      navigate(storeDetailPath(banner.storeId));
    } else if (banner.linkUrl) {
      window.open(banner.linkUrl, '_blank');
    }
  };

  if (!banners.length) return null;

  return (
    <div className="px-4">
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="min-w-full"
              onClick={() => handleBannerClick(banner)}
            >
              <img
                src={banner.sponsoredImageUrl || banner.imageUrl}
                alt={banner.title || 'Banner'}
                className="w-full h-44 object-cover cursor-pointer select-none"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        {total > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
