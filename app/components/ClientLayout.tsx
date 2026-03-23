'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from './ThemeProvider';
import LoadingScreen from './LoadingScreen';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  
  // Lazy initialization to check session storage
  const [isLoading, setIsLoading] = useState(() => {
    // Server-side: always false
    if (typeof window === 'undefined') return false;
    
    // Client-side: check if user hasn't seen loading screen and not admin
    if (isAdmin) return false;
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
    if (!hasSeenLoading) {
      sessionStorage.setItem('hasSeenLoading', 'true');
      return true;
    }
    return false;
  });
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Skip loading screen for admin routes
  if (isAdmin) {
    return <ThemeProvider>{children}</ThemeProvider>;
  }

  return (
    <ThemeProvider>
      {mounted && isLoading ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        children
      )}
    </ThemeProvider>
  );
}