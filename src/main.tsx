import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { AppRouter } from './router/AppRouter';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute default
    },
    mutations: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/client">
        <AppRouter />
        <Toaster
          position="top-center"
          containerStyle={{ top: 64 }}
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '12px',
              background: '#0F172A',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 500,
              maxWidth: '320px',
            },
            success: {
              iconTheme: { primary: '#16A34A', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#DC2626', secondary: '#fff' },
            },
          }}
        />
      </BrowserRouter>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </React.StrictMode>
);
