import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLocationStore } from '@/store/locationStore';
import { ROUTES } from '@/constants/routes';

export function withLocation<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  const WithLocationComponent: React.FC<P> = (props) => {
    const districtCode = useLocationStore((s) => s.districtCode);

    if (!districtCode) {
      return <Navigate to={ROUTES.LOCATION_SETUP} replace />;
    }

    return <WrappedComponent {...props} />;
  };

  WithLocationComponent.displayName = `withLocation(${WrappedComponent.displayName || WrappedComponent.name})`;
  return WithLocationComponent;
}
