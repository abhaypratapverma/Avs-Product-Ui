import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopAppBar } from '@/components/organisms/TopAppBar';
import { BottomNav } from '@/components/organisms/BottomNav';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-mobile mx-auto">
      <TopAppBar />
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};
