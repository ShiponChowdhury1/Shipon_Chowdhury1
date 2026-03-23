'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Lazy initialization - only runs once, no setState in effect needed
  const [theme, setThemeState] = useState<Theme>(() => {
    // Server-side: always return 'dark'
    if (typeof window === 'undefined') return 'dark';
    
    // Client-side: read from storage
    const sessionTheme = sessionStorage.getItem('theme') as Theme;
    const savedTheme = localStorage.getItem('theme') as Theme;
    return sessionTheme || savedTheme || 'dark';
  });

  // Apply theme to document whenever it changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Save to storage
    localStorage.setItem('theme', theme);
    sessionStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const value = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}