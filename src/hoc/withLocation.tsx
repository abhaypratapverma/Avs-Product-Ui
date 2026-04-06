// src/hoc/withLocation.tsx
import { type ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store';
import { ROUTES } from '../constants/routes';

export function withLocation<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithLocation = (props: P) => {
    const isLocationSet = useAppSelector((s) => s.location.isLocationSet);

    if (!isLocationSet) {
      return <Navigate to={ROUTES.locationSetup} replace />;
    }

    return <WrappedComponent {...props} />;
  };

  WithLocation.displayName = `withLocation(${WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'})`;
  return WithLocation;
}
