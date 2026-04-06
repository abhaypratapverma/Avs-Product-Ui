// src/hoc/withAuth.tsx
import { type ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store';
import { ROUTES } from '../constants/routes';

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithAuth = (props: P) => {
    const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
    const location = useLocation();

    if (!isAuthenticated) {
      return (
        <Navigate
          to={ROUTES.login}
          state={{ returnTo: location.pathname }}
          replace
        />
      );
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `withAuth(${WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'})`;
  return WithAuth;
}
