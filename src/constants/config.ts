/// <reference types="vite/client" />

// src/constants/config.ts

export const CONFIG = {
  appName:    (import.meta.env['VITE_APP_NAME'] as string | undefined) ?? 'AVS',
  apiBaseUrl: (import.meta.env['VITE_API_BASE_URL'] as string | undefined) ?? '',
  mapsKey:    (import.meta.env['VITE_GOOGLE_MAPS_KEY'] as string | undefined) ?? '',
  env:        (import.meta.env['VITE_APP_ENV'] as string | undefined) ?? 'development',
  useMock:    import.meta.env['VITE_USE_MOCK'] === 'true',
} as const;
