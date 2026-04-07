// src/pages/Addresses/Addresses.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { PageWrapper } from '../../components/layouts/PageWrapper';
import { AddressCard } from '../../components/molecules/AddressCard';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import { BottomSheet } from '../../components/common/BottomSheet';
import { Skeleton } from '../../components/atoms/Skeleton';
import { 
  useGetAddressesQuery, 
  useCreateAddressMutation, 
  useDeleteAddressMutation,
  useUpdateAddressMutation,
  useSetDefaultAddressMutation
} from '../../api/services/addressApi';
import type { Address } from '../../types/api.types';

const addressSchema = z.object({
  line1:   z.string().min(5, 'Enter valid address'),
  line2:   z.string().optional(),
  city:    z.string().min(2, 'Enter city'),
  state:   z.string().min(2, 'Enter state'),
  pincode: z.string().length(6, 'Enter 6-digit pincode'),
  type:    z.enum(['home', 'work', 'other']),
});

type AddressForm = z.infer<typeof addressSchema>;

export function Addresses() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data: addresses, isLoading } = useGetAddressesQuery();
  const [createAddress, { isLoading: creating }] = useCreateAddressMutation();
  const [updateAddress, { isLoading: updating }] = useUpdateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const [setDefaultAddress] = useSetDefaultAddressMutation();

  const [selectedType, setSelectedType] = useState<'home' | 'work' | 'other'>('home');

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: { type: 'home' },
  });

  const handleEdit = (address: Address) => {
    setEditingId(address.id);
    setSelectedType(address.type);
    reset({
      line1: address.line1,
      line2: address.line2 ?? '',
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      type: address.type,
    });
    setShowForm(true);
  };

  const onSubmit = async (data: AddressForm) => {
    try {
      if (editingId) {
        await updateAddress({
          ...data,
          id: editingId,
          userId: 1, // Phase 1 mock
          district: 'Lucknow',
          isDefault: false, // backend handles default via a separate endpoint typically
        }).unwrap();
        toast.success('Address updated!');
      } else {
        await createAddress({
          ...data,
          line2: data.line2 ?? '',
          district: 'Lucknow',
          isDefault: (addresses?.length ?? 0) === 0,
        }).unwrap();
        toast.success('Address added!');
      }
      reset();
      setEditingId(null);
      setShowForm(false);
    } catch {
      toast.error(editingId ? 'Failed to update address' : 'Failed to add address');
    }
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingId(null);
    reset({ type: 'home', line1: '', line2: '', city: '', state: '', pincode: '' });
    setSelectedType('home');
  };

  return (
    <PageWrapper>
      <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-border">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="flex-1 font-bold text-gray-900 text-lg">My Addresses</h1>
        <button
          onClick={() => { setEditingId(null); reset(); setShowForm(true); }}
          className="flex items-center gap-1 text-primary text-sm font-semibold"
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3 pb-safe">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} shape="card" height="90px" />
          ))
        ) : (addresses?.length ?? 0) === 0 ? (
          <div className="border-2 border-dashed border-border rounded-card p-8 text-center flex flex-col items-center gap-3">
            <MapPin className="w-10 h-10 text-muted" />
            <p className="font-semibold text-gray-700">Add your first address</p>
            <Button onClick={() => setShowForm(true)} size="sm">
              <Plus className="w-4 h-4 mr-1" /> Add Address
            </Button>
          </div>
        ) : (
          addresses?.map(address => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => handleEdit(address)}
              onSetDefault={() => {
                void setDefaultAddress(address.id).unwrap()
                  .then(() => toast.success('Default address updated'))
                  .catch(() => toast.error('Failed to set default address'));
              }}
              onDelete={() => {
                void deleteAddress(address.id).unwrap()
                  .then(() => toast.success('Address removed'))
                  .catch(() => toast.error('Failed to remove address'));
              }}
            />
          ))
        )}
      </div>

      {/* Add/Edit Address Bottom Sheet */}
      <BottomSheet isOpen={showForm} onClose={handleClose} title={editingId ? 'Edit Address' : 'Add New Address'}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-4">
          {/* Address Type */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Type</label>
            <div className="flex gap-2">
              {(['home', 'work', 'other'] as const).map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { setSelectedType(t); setValue('type', t); }}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border capitalize transition-colors ${
                    selectedType === t ? 'border-primary bg-primary/5 text-primary' : 'border-border text-gray-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <Input {...register('line1')} id="line1" label="Address Line 1" placeholder="House/Flat number, Street" error={errors.line1?.message} />
          <Input {...register('line2')} id="line2" label="Address Line 2 (optional)" placeholder="Area, Landmark" />
          <div className="grid grid-cols-2 gap-3">
            <Input {...register('city')} id="city" label="City" placeholder="City" error={errors.city?.message} />
            <Input {...register('pincode')} id="pincode" label="Pincode" placeholder="000000" maxLength={6} error={errors.pincode?.message} />
          </div>
          <Input {...register('state')} id="state" label="State" placeholder="State" error={errors.state?.message} />
          <Button type="submit" size="lg" fullWidth loading={creating || updating}>
            {editingId ? 'Update Address' : 'Save Address'}
          </Button>
        </form>
      </BottomSheet>
    </PageWrapper>
  );
}
