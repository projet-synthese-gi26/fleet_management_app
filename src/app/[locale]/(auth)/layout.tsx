import React from 'react';
import { Header } from '@/components/layouts/Header'; // Import the Header component

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen"> {/* Added a div to wrap Header and children */}
      <Header />
      {children}
    </div>
  );
}
