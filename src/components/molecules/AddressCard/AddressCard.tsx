import React from 'react';
import { MapPin, CheckCircle2, MoreVertical } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { Address } from '@/types/order.types';

interface AddressCardProps {
  address: Address;
  isSelected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onSetDefault?: () => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onSetDefault,
}) => {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div
      className={cn(
        'bg-white rounded-2xl p-4 shadow-card border-2 transition-all',
        isSelected ? 'border-primary' : 'border-transparent',
        onSelect && 'cursor-pointer active:scale-[0.99]'
      )}
      onClick={onSelect}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
            isSelected ? 'bg-primary-50' : 'bg-gray-100'
          )}
        >
          <MapPin
            size={18}
            className={isSelected ? 'text-primary' : 'text-textSecondary'}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-textPrimary text-sm">{address.label}</span>
            {address.isDefault && (
              <span className="text-xs bg-primary-50 text-primary px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                <CheckCircle2 size={10} />
                Default
              </span>
            )}
          </div>
          <p className="text-sm text-textSecondary leading-relaxed">
            {[address.line1, address.line2, address.city, address.state, address.pincode]
              .filter(Boolean)
              .join(', ')}
          </p>
        </div>

        {/* Actions menu */}
        {(onEdit || onDelete || onSetDefault) && (
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu((v) => !v);
              }}
              className="p-1 rounded-lg hover:bg-gray-100 text-textSecondary"
            >
              <MoreVertical size={16} />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-7 bg-white rounded-xl shadow-elevated border border-border z-10 min-w-[130px]">
                {!address.isDefault && onSetDefault && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSetDefault();
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-textPrimary hover:bg-gray-50"
                  >
                    Set as Default
                  </button>
                )}
                {onEdit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit();
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-textPrimary hover:bg-gray-50"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-error hover:bg-red-50"
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
