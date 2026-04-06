import React, { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { PageWrapper } from '@/components/layouts/PageWrapper';
import { AddressCard } from '@/components/molecules/AddressCard';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Skeleton } from '@/components/atoms/Skeleton';
import { useAddresses } from '@/queries/useAddresses';
import {
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from '@/api/services/address.service';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { withAuth } from '@/hoc/withAuth';
import type { Address } from '@/types/order.types';
import toast from 'react-hot-toast';

const AddressesPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: addresses, isLoading } = useAddresses();

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    label: 'Home',
    line1: '',
    line2: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.addresses.list() });

  const setDefaultMutation = useMutation({
    mutationFn: (id: number) => setDefaultAddress(id),
    onSuccess: () => {
      toast.success('Default address updated');
      invalidate();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAddress(id),
    onSuccess: () => {
      toast.success('Address deleted');
      invalidate();
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editingAddress) {
        return updateAddress(editingAddress.id, formData);
      }
      return createAddress(formData);
    },
    onSuccess: () => {
      toast.success(editingAddress ? 'Address updated' : 'Address added');
      invalidate();
      setShowForm(false);
      setEditingAddress(null);
      setFormData({ label: 'Home', line1: '', line2: '', city: '', district: '', state: '', pincode: '' });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : 'Failed to save address');
    },
  });

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      label: address.label,
      line1: address.line1,
      line2: address.line2 || '',
      city: address.city,
      district: address.district,
      state: address.state,
      pincode: address.pincode,
    });
    setShowForm(true);
  };

  const f = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((d) => ({ ...d, [key]: e.target.value }));

  return (
    <PageWrapper>
      <div className="px-4 pt-4 pb-8 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-bold text-textPrimary text-lg flex-1">My Addresses</h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-1 text-primary text-sm font-semibold"
              id="add-address-btn"
            >
              <Plus size={16} />
              Add New
            </button>
          )}
        </div>

        {/* Address form */}
        {showForm && (
          <div className="bg-white rounded-2xl p-4 shadow-card space-y-3">
            <h2 className="font-semibold text-textPrimary">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </h2>
            <Input label="Label" placeholder="Home / Work / Other" value={formData.label} onChange={f('label')} id="addr-label" />
            <Input label="Address Line 1" placeholder="Building, Street" value={formData.line1} onChange={f('line1')} id="addr-line1" />
            <Input label="Address Line 2 (optional)" placeholder="Landmark" value={formData.line2} onChange={f('line2')} id="addr-line2" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="City" value={formData.city} onChange={f('city')} id="addr-city" />
              <Input label="District" value={formData.district} onChange={f('district')} id="addr-district" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="State" value={formData.state} onChange={f('state')} id="addr-state" />
              <Input label="Pincode" value={formData.pincode} onChange={f('pincode')} inputMode="numeric" maxLength={6} id="addr-pincode" />
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="ghost" onClick={() => { setShowForm(false); setEditingAddress(null); }} fullWidth>
                Cancel
              </Button>
              <Button
                onClick={() => saveMutation.mutate()}
                isLoading={saveMutation.isPending}
                fullWidth
                id="save-address-btn"
              >
                {editingAddress ? 'Update' : 'Save'}
              </Button>
            </div>
          </div>
        )}

        {/* Addresses list */}
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-24" rounded="lg" />
            ))}
          </div>
        ) : !addresses?.length && !showForm ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📍</div>
            <h2 className="font-bold text-textPrimary mb-2">No addresses saved</h2>
            <p className="text-sm text-textSecondary mb-6">
              Add your first delivery address to get started
            </p>
            <Button onClick={() => setShowForm(true)} id="add-first-address-btn">
              Add Address
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {addresses?.map((addr) => (
              <AddressCard
                key={addr.id}
                address={addr}
                onEdit={() => handleEdit(addr)}
                onDelete={() => deleteMutation.mutate(addr.id)}
                onSetDefault={() => setDefaultMutation.mutate(addr.id)}
              />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default withAuth(AddressesPage);
