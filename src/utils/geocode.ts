import { config } from '@/constants/config';

interface GeocodeResult {
  districtCode: string;
  districtLabel: string;
  state: string;
}

interface GoogleGeocodeComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GoogleGeocodeResponse {
  status: string;
  results: Array<{
    address_components: GoogleGeocodeComponent[];
    formatted_address: string;
  }>;
}

/**
 * Reverse geocode lat/lng to district information using Google Maps API.
 * Extracts administrative_area_level_3 as the district identifier.
 */
export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<GeocodeResult> {
  const key = config.googleMapsKey;
  if (!key || key === 'your_google_maps_api_key') {
    // Fallback for dev without Maps key
    return {
      districtCode: 'UNKNOWN001',
      districtLabel: 'Current Location',
      state: 'IN',
    };
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;
  const res = await fetch(url);
  const data: GoogleGeocodeResponse = await res.json();

  if (data.status !== 'OK' || !data.results.length) {
    throw new Error('Unable to resolve location. Please try again.');
  }

  const components = data.results[0].address_components;

  const district = components.find((c) =>
    c.types.includes('administrative_area_level_3')
  );
  const stateComponent = components.find((c) =>
    c.types.includes('administrative_area_level_1')
  );
  const country = components.find((c) => c.types.includes('country'));

  const districtName = district?.long_name || 'Unknown District';
  const stateName = stateComponent?.short_name || 'IN';
  const countryCode = country?.short_name || 'IN';

  // Build a simple districtCode from district + country (slug-like)
  const districtCode = `${countryCode}_${districtName.toUpperCase().replace(/\s+/g, '_')}`;
  const districtLabel = `${districtName}, ${stateName}`;

  return { districtCode, districtLabel, state: stateName };
}

/**
 * Resolve district info from a pincode using Google Geocode API.
 */
export async function geocodeFromPincode(
  pincode: string
): Promise<GeocodeResult> {
  const key = config.googleMapsKey;
  if (!key || key === 'your_google_maps_api_key') {
    return {
      districtCode: `PIN_${pincode}`,
      districtLabel: `Pincode ${pincode}`,
      state: 'IN',
    };
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${pincode},India&key=${key}`;
  const res = await fetch(url);
  const data: GoogleGeocodeResponse = await res.json();

  if (data.status !== 'OK' || !data.results.length) {
    throw new Error('Invalid pincode. Please try a different pincode.');
  }

  const components = data.results[0].address_components;

  const district = components.find((c) =>
    c.types.includes('administrative_area_level_3')
  );
  const stateComponent = components.find((c) =>
    c.types.includes('administrative_area_level_1')
  );

  const districtName = district?.long_name || 'Unknown District';
  const stateName = stateComponent?.short_name || 'IN';
  const districtCode = `IN_${districtName.toUpperCase().replace(/\s+/g, '_')}`;
  const districtLabel = `${districtName}, ${stateName}`;

  return { districtCode, districtLabel, state: stateName };
}
