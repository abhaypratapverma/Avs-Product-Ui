// src/components/molecules/AddressCard/AddressCard.tsx
import { Home, Briefcase, MapPin, Check, Trash2, Edit2 } from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { Address } from '../../../types/api.types';

interface AddressCardProps {
  address: Address;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onSetDefault?: () => void;
}

const typeIcons = {
  home:  Home,
  work:  Briefcase,
  other: MapPin,
};

export function AddressCard({ address, selectable, selected, onSelect, onDelete, onEdit, onSetDefault }: AddressCardProps) {
  const Icon = typeIcons[address.type];

  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full text-left bg-white rounded-card p-4 shadow-card transition-all',
        selected && 'border border-primary ring-1 ring-primary/20',
        !selected && 'border border-transparent',
        selectable && 'hover:border-primary/40 cursor-pointer',
        !selectable && 'cursor-default',
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
          selected ? 'bg-primary/10' : 'bg-surface',
        )}>
          <Icon className={cn('w-4 h-4', selected ? 'text-primary' : 'text-muted')} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-gray-900 capitalize">{address.type}</span>
            {address.isDefault && (
              <span className="text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-chip">Default</span>
            )}
          </div>
          <p className="text-xs text-muted mt-0.5 leading-relaxed">
            {address.line1}{address.line2 ? `, ${address.line2}` : ''}, {address.city}, {address.state} - {address.pincode}
          </p>
        </div>
        <div className="flex flex-col items-end justify-between h-full flex-shrink-0">
          {selected && <Check className="w-5 h-5 text-primary mb-2" />}
          <div className="flex items-center gap-3 mt-auto pt-2">
            {onSetDefault && !address.isDefault && (
              <button
                onClick={(e) => { e.stopPropagation(); onSetDefault(); }}
                className="text-muted hover:text-yellow-500 transition-colors"
                title="Set as Default"
              >
                <div className="text-[10px] font-semibold uppercase tracking-wider">Set Default</div>
              </button>
            )}
            {onEdit && (
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className="text-muted hover:text-blue-500 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="text-muted hover:text-danger transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
