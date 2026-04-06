// src/hoc/withGuestAccess.tsx
// Allows browsing without login, but gates cart/checkout actions
// Phase 1: gating is done via useCart hook which checks auth state
// The HOC itself just marks the page as guest-accessible
import { type ComponentType } from 'react';

export function withGuestAccess<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithGuestAccess = (props: P) => {
    return <WrappedComponent {...props} />;
  };

  WithGuestAccess.displayName = `withGuestAccess(${WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'})`;
  return WithGuestAccess;
}
