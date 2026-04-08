import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import './styles/globals.css';
import store from './store';
import { injectStore } from './api/axiosInstance';
import { AppRouter } from './router/AppRouter';
import { getRouterBasename } from './constants/appBase';

// Inject store into axios instance for token/district headers
injectStore(store);

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter
        basename={getRouterBasename()}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AppRouter />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '12px',
              background: '#1E293B',
              color: '#F8FAFC',
              fontSize: '14px',
              fontWeight: 500,
              maxWidth: '380px',
            },
            success: {
              iconTheme: { primary: '#16A34A', secondary: '#FFFFFF' },
            },
            error: {
              iconTheme: { primary: '#DC2626', secondary: '#FFFFFF' },
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
