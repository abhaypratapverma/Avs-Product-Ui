// src/store/slices/locationSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface LocationState {
  districtCode: string | null;
  districtLabel: string | null;
  coords: { lat: number; lng: number } | null;
  isLocationSet: boolean;
}

const initialState: LocationState = {
  districtCode: localStorage.getItem('districtCode'),
  districtLabel: localStorage.getItem('districtLabel'),
  coords: null,
  isLocationSet: !!localStorage.getItem('districtCode'),
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation(
      state,
      action: PayloadAction<{
        districtCode: string;
        districtLabel: string;
        coords?: { lat: number; lng: number };
      }>,
    ) {
      state.districtCode = action.payload.districtCode;
      state.districtLabel = action.payload.districtLabel;
      state.coords = action.payload.coords ?? null;
      state.isLocationSet = true;
      localStorage.setItem('districtCode', action.payload.districtCode);
      localStorage.setItem('districtLabel', action.payload.districtLabel);
    },
    clearLocation(state) {
      state.districtCode = null;
      state.districtLabel = null;
      state.coords = null;
      state.isLocationSet = false;
      localStorage.removeItem('districtCode');
      localStorage.removeItem('districtLabel');
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
