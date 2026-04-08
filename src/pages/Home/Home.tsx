// src/pages/Home/Home.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageWrapper } from '../../components/layouts/PageWrapper';
import { BannerCarousel } from '../../components/organisms/BannerCarousel';
import { CategoryRow } from '../../components/organisms/CategoryRow';
import { StoreCard } from '../../components/molecules/StoreCard';
import { Skeleton } from '../../components/atoms/Skeleton';
import { Avatar } from '../../components/atoms/Avatar';
import { SearchBar } from '../../components/molecules/SearchBar';
import { useGetBannersQuery, useGetCategoriesQuery, useGetMerchantsQuery } from '../../api/services/homeApi';
import { useGetShopsQuery } from '../../api/services/homeApi';
import { useAppSelector } from '../../store';
import { ROUTES } from '../../constants/routes';

export function Home() {
  const navigate = useNavigate();
  const districtCode = useAppSelector((s) => s.location.districtCode ?? '');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const skip = !districtCode;
  const { data: banners, isLoading: bannersLoading } = useGetBannersQuery(districtCode, { skip });
  const { data: categories, isLoading: catsLoading } = useGetCategoriesQuery();
  const { data: merchants, isLoading: merchantsLoading } = useGetMerchantsQuery(districtCode, { skip });
  const { data: shops, isLoading: shopsLoading } = useGetShopsQuery(districtCode, { skip });

  const selectedCat = categories?.find((c) => c.slug === selectedCategory);
  const filteredShops =
    selectedCategory === 'all'
      ? (shops ?? [])
      : (shops ?? []).filter((s) =>
          selectedCat ? s.category.toLowerCase() === selectedCat.name.toLowerCase() : true,
        );

  return (
    <PageWrapper>
      {/* Search Bar */}
      <div className="px-4 py-3 bg-white border-b border-border">
        <SearchBar
          value=""
          onChange={() => {}}
          placeholder="Search stores, products..."
          onFilter={() => {}}
          className="w-full"
        />
      </div>

      {/* Category chips */}
      <div className="px-4 py-3 bg-white border-b border-border">
        <CategoryRow
          categories={categories ?? []}
          isLoading={catsLoading}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      <div className="px-4 py-4 flex flex-col gap-6">
        {/* Banner Carousel */}
        <BannerCarousel banners={banners ?? []} isLoading={bannersLoading} />

        {/* Top Merchants */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-900 text-base">Top Merchants</h2>
            <button className="text-primary text-xs font-semibold flex items-center gap-1">
              VIEW ALL <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          {merchantsLoading ? (
            <div className="scroll-row">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2 w-[70px]">
                  <Skeleton shape="circle" width="56px" height="56px" />
                  <Skeleton width="60px" height="12px" />
                </div>
              ))}
            </div>
          ) : (
            <div className="scroll-row">
              {(merchants ?? []).map((m) => (
                <div key={m.id} className="flex flex-col items-center gap-2 w-[72px] flex-shrink-0">
                  <Avatar src={m.avatarUrl} name={m.name} size="lg" />
                  <p className="text-[11px] font-semibold text-gray-700 text-center leading-tight line-clamp-2">
                    {m.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Jump Back In */}
        {!shopsLoading && (shops ?? []).some(s => s.isFeatured) && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900 text-base">Jump Back In</h2>
            </div>
            <div className="scroll-row gap-3">
              {(shops ?? []).filter(s => s.isFeatured).slice(0, 4).map(store => (
                <div key={store.id} className="w-[140px] flex-shrink-0">
                  <StoreCard store={store} variant="compact" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Stores Near You */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-900 text-base">Stores Near You</h2>
            <button
              onClick={() => navigate(ROUTES.explore)}
              className="text-primary text-xs font-semibold flex items-center gap-1"
            >
              SEE ALL <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {shopsLoading ? (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-card overflow-hidden shadow-card">
                  <Skeleton shape="banner" height="140px" className="rounded-none" />
                  <div className="p-3 flex flex-col gap-2 pt-6">
                    <Skeleton shape="line" height="16px" width="60%" />
                    <Skeleton shape="line" height="12px" width="40%" />
                    <Skeleton shape="line" lines={2} />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredShops.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="text-5xl mb-3">🏪</div>
              <p className="font-semibold text-gray-800">No stores in this category</p>
              <p className="text-muted text-sm mt-1">Try selecting a different category</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredShops.map((store) => (
                <StoreCard key={store.id} store={store} variant="full" />
              ))}
            </div>
          )}
        </section>
      </div>
    </PageWrapper>
  );
}
