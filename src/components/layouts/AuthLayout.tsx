import React from 'react';
import { config } from '@/constants/config';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 flex flex-col items-center justify-center px-4 py-8 max-w-mobile mx-auto">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-elevated">
          <span className="text-white font-black text-2xl">{config.appName[0]}</span>
        </div>
        {title && (
          <h1 className="text-2xl font-black text-textPrimary">{title}</h1>
        )}
        {subtitle && (
          <p className="text-textSecondary text-sm mt-1">{subtitle}</p>
        )}
      </div>

      {/* Card */}
      <div className="w-full bg-white rounded-3xl p-6 shadow-elevated">
        {children}
      </div>
    </div>
  );
};
