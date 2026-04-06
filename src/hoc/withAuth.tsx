import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/constants/routes';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  const WithAuthComponent: React.FC<P> = (props) => {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const location = useLocation();

    if (!isAuthenticated) {
      return (
        <Navigate
          to={ROUTES.LOGIN}
          state={{ returnTo: location.pathname }}
          replace
        />
      );
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;
  return WithAuthComponent;
}
