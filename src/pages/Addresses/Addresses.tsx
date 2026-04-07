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
import { useGetAddressesQuery, useCreateAddressMutation, useDeleteAddressMutation } from '../../api/services/addressApi';

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
  const { data: addresses, isLoading } = useGetAddressesQuery();
  const [createAddress, { isLoading: creating }] = useCreateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const [selectedType, setSelectedType] = useState<'home' | 'work' | 'other'>('home');

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: { type: 'home' },
  });

  const onSubmit = async (data: AddressForm) => {
    try {
      await createAddress({
        ...data,
        line2: data.line2 ?? '',
        district: 'Lucknow',
        isDefault: (addresses?.length ?? 0) === 0,
      }).unwrap();
      toast.success('Address added!');
      reset();
      setShowForm(false);
    } catch {
      toast.error('Failed to add address');
    }
  };

  return (
    <PageWrapper>
      <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-border">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="flex-1 font-bold text-gray-900 text-lg">My Addresses</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1 text-primary text-sm font-semibold"
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3">
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
              onDelete={() => {
                void deleteAddress(address.id);
                toast.success('Address removed');
              }}
            />
          ))
        )}
      </div>

      {/* Add Address Bottom Sheet */}
      <BottomSheet isOpen={showForm} onClose={() => { setShowForm(false); reset(); }} title="Add New Address">
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
          <Button type="submit" size="lg" fullWidth loading={creating}>Save Address</Button>
        </form>
      </BottomSheet>
    </PageWrapper>
  );
}
