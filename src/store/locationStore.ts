import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Coords {
  lat: number;
  lng: number;
}

interface LocationState {
  districtCode: string | null;
  districtLabel: string | null;
  coords: Coords | null;
}

interface LocationActions {
  setLocation: (districtCode: string, label: string, coords?: Coords) => void;
  clearLocation: () => void;
}

type LocationStore = LocationState & LocationActions;

export const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      districtCode: null,
      districtLabel: null,
      coords: null,

      setLocation: (districtCode, label, coords) => {
        set({ districtCode, districtLabel: label, coords: coords ?? null });
      },

      clearLocation: () => {
        set({ districtCode: null, districtLabel: null, coords: null });
      },
    }),
    {
      name: 'avs-location',
      // Only persist districtCode + label — coords are not critical to persist
      partialize: (state) => ({
        districtCode: state.districtCode,
        districtLabel: state.districtLabel,
      }),
    }
  )
);
