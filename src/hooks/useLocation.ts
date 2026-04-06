// src/hooks/useLocation.ts
import { useAppSelector, useAppDispatch } from '../store';
import { setLocation, clearLocation } from '../store/slices/locationSlice';

export function useLocation() {
  const dispatch = useAppDispatch();
  const { districtCode, districtLabel, coords, isLocationSet } = useAppSelector((s) => s.location);

  const changeLocation = (code: string, label: string, newCoords?: { lat: number; lng: number }) => {
    dispatch(setLocation({ districtCode: code, districtLabel: label, coords: newCoords }));
  };

  const resetLocation = () => {
    dispatch(clearLocation());
  };

  return { districtCode, districtLabel, coords, isLocationSet, changeLocation, resetLocation };
}
