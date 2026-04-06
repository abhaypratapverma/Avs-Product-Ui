import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layouts/PageWrapper';
import { BannerCarousel } from '@/components/organisms/BannerCarousel';
import { CategoryRow } from '@/components/organisms/CategoryRow';
import { StoreList } from '@/components/organisms/StoreList';
import { BannerSkeleton, Skeleton } from '@/components/atoms/Skeleton';
import { useHomeData } from '@/queries/useHomeData';
import { withLocation } from '@/hoc/withLocation';
import { withGuestAccess } from '@/hoc/withGuestAccess';
import { ROUTES } from '@/constants/routes';
import { config } from '@/constants/config';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { banners, shops, categories, isLoading } = useHomeData();

  return (
    <PageWrapper>
      <div className="space-y-6 py-4">
        {/* Welcome greeting */}
        <div className="px-4">
          <h1 className="text-xl font-black text-textPrimary">
            {config.appName} 🛍️
          </h1>
          <p className="text-sm text-textSecondary">
            Fresh products from your local stores
          </p>
        </div>

        {/* Banner Carousel */}
        {isLoading ? (
          <BannerSkeleton />
        ) : banners.length > 0 ? (
          <BannerCarousel banners={banners} />
        ) : null}

        {/* Categories */}
        {isLoading ? (
          <div className="px-4">
            <Skeleton className="w-28 h-5 mb-3" />
            <div className="flex gap-3 overflow-hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2 shrink-0">
                  <Skeleton className="w-16 h-16" rounded="lg" />
                  <Skeleton className="w-12 h-3" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <CategoryRow categories={categories} />
        )}

        {/* Nearby Stores */}
        <div>
          <div className="px-4 mb-3 flex items-center justify-between">
            <h2 className="font-bold text-textPrimary text-base">Nearby Stores</h2>
            <button
              onClick={() => navigate(ROUTES.EXPLORE)}
              className="text-primary text-sm font-semibold"
            >
              See all
            </button>
          </div>

          {shops.length === 0 && !isLoading ? (
            <div className="px-4 text-center py-12">
              <div className="text-5xl mb-4">🏪</div>
              <h3 className="font-semibold text-textPrimary mb-2">No stores yet</h3>
              <p className="text-sm text-textSecondary mb-4">
                We're working on bringing stores to your area.
              </p>
              <button
                onClick={() => navigate(ROUTES.COMING_SOON)}
                className="text-primary text-sm font-semibold"
              >
                Notify me when available
              </button>
            </div>
          ) : (
            <StoreList stores={shops} isLoading={isLoading} />
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default withLocation(withGuestAccess(HomePage));
