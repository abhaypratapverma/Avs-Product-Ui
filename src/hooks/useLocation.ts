import { useState, useCallback } from 'react';
import { useLocationStore } from '@/store/locationStore';
import { reverseGeocode, geocodeFromPincode } from '@/utils/geocode';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';


interface UseLocationReturn {
  districtCode: string | null;
  districtLabel: string | null;
  isLoading: boolean;
  error: string | null;
  requestGPS: () => Promise<void>;
  resolveFromPincode: (pincode: string) => Promise<void>;
  changeLocation: () => void;
}

export function useLocation(): UseLocationReturn {
  const { districtCode, districtLabel, setLocation, clearLocation } = useLocationStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestGPS = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let lat: number;
      let lng: number;

      if (Capacitor.isNativePlatform()) {
        // Capacitor native path (Android/iOS)
        const pos = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
        });
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
      } else {
        // Browser geolocation API
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser.'));
            return;
          }
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
          });
        });
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
      }

      const result = await reverseGeocode(lat, lng);
      setLocation(result.districtCode, result.districtLabel, { lat, lng });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to get location.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [setLocation]);

  const resolveFromPincode = useCallback(
    async (pincode: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await geocodeFromPincode(pincode);
        setLocation(result.districtCode, result.districtLabel);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to resolve pincode.';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [setLocation]
  );

  const changeLocation = useCallback(() => {
    clearLocation();
  }, [clearLocation]);

  return {
    districtCode,
    districtLabel,
    isLoading,
    error,
    requestGPS,
    resolveFromPincode,
    changeLocation,
  };
}
