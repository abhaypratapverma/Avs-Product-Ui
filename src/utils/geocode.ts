// src/utils/geocode.ts
// Phase 1: stubbed — `districtCode` is always a 6-digit pincode for customer/public APIs.
// Phase 2: replace with real Google Maps Geocoding API call

interface GeoResult {
  /** 6-digit pincode — sent as URL segment and X-District-Code */
  districtCode: string;
  districtLabel: string;
  coords: { lat: number; lng: number };
}

export async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<GeoResult> {
  void lat;
  void lng;
  // Stub: Lucknow area pincode until real reverse geocoding returns ZIP
  return {
    districtCode: '226001',
    districtLabel: 'Lucknow, UP',
    coords: { lat, lng },
  };
}

export async function pincodeToDistrict(pincode: string): Promise<GeoResult> {
  const clean = pincode.replace(/\D/g, '').slice(0, 6);
  return {
    districtCode: clean,
    districtLabel: `Pincode ${clean}`,
    coords: { lat: 26.8467, lng: 80.9462 },
  };
}
