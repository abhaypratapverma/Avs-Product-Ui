// src/utils/geocode.ts
// Phase 1: stubbed — returns hardcoded Lucknow district
// Phase 2: replace with real Google Maps Geocoding API call

interface GeoResult {
  districtCode: string;
  districtLabel: string;
  coords: { lat: number; lng: number };
}

export async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<GeoResult> {
  // Phase 1 stub — always returns Lucknow
  void lat;
  void lng;
  return {
    districtCode: 'Lucknow',
    districtLabel: 'Lucknow, UP',
    coords: { lat, lng },
  };
}

export async function pincodeToDistrict(pincode: string): Promise<GeoResult> {
  // Phase 1 stub — hardcoded Lucknow
  void pincode;
  return {
    districtCode: 'Lucknow',
    districtLabel: 'Lucknow, UP',
    coords: { lat: 26.8467, lng: 80.9462 },
  };
}
