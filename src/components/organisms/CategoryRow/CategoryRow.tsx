import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Category } from '@/types/store.types';
import { ROUTES } from '@/constants/routes';

interface CategoryRowProps {
  categories: Category[];
}

const categoryColors = [
  'bg-blue-50 text-blue-700',
  'bg-purple-50 text-purple-700',
  'bg-green-50 text-green-700',
  'bg-amber-50 text-amber-700',
  'bg-rose-50 text-rose-700',
  'bg-teal-50 text-teal-700',
];

export const CategoryRow: React.FC<CategoryRowProps> = ({ categories }) => {
  const navigate = useNavigate();

  if (!categories.length) return null;

  return (
    <div>
      <div className="px-4 mb-3">
        <h2 className="font-bold text-textPrimary text-base">Categories</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide">
        {categories.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => navigate(`${ROUTES.EXPLORE}?category=${cat.slug}`)}
            className="flex flex-col items-center gap-2 active:scale-95 transition-transform min-w-fit"
          >
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                categoryColors[idx % categoryColors.length]
              }`}
            >
              {cat.iconUrl ? (
                <img src={cat.iconUrl} alt={cat.name} className="w-8 h-8 object-contain" />
              ) : (
                <span className="text-2xl">{getCategoryEmoji(cat.slug)}</span>
              )}
            </div>
            <span className="text-xs font-medium text-textPrimary text-center max-w-[64px] leading-tight">
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

function getCategoryEmoji(slug: string): string {
  const map: Record<string, string> = {
    grocery: '🛒',
    vegetables: '🥦',
    fruits: '🍎',
    dairy: '🥛',
    bakery: '🍞',
    meat: '🥩',
    pharmacy: '💊',
    electronics: '📱',
    clothing: '👕',
    restaurant: '🍽️',
    pharmacy_medicine: '💊',
    stationary: '✏️',
    beauty: '💄',
  };
  return map[slug] || '🏪';
}
