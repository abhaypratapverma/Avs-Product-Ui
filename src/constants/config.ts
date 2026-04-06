export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
  googleMapsKey: import.meta.env.VITE_GOOGLE_MAPS_KEY as string,
  appName: (import.meta.env.VITE_APP_NAME as string) || 'AVS',
  appEnv: (import.meta.env.VITE_APP_ENV as string) || 'development',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
