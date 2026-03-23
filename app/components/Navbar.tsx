'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, User } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { data: session, status } = useSession();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/#projects' },
    { label: 'About', href: '/#about' },
    { label: 'Process', href: '/#process' },
    { label: 'Reviews', href: '/#reviews' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-[#15192D] backdrop-blur-lg z-50 border-b border-gray-200 dark:border-[#2D3554] p-5">
      <div className="max-w-7xl mx-auto px-4  lg:px-0">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-sm lg:text-lg font-bold text-black dark:text-white uppercase font-accent">
            Shipon Chowdhury
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-800 uppercase dark:text-white hover:text-[#7C4DFF] transition-all duration-300 text-[16px] font-medium relative group font-body"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7C4DFF] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-[120px] h-[52px] px-4 py-2 bg-secondary/50 border border-[#7C4DFF] rounded-lg hover:bg-secondary hover:border-[#7C4DFF]/80 transition-all duration-200 font-medium text-sm"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-500" />
                )}
                <span className="text-foreground font-body">
                  {theme === 'dark' ? 'Light' : 'Dark'}
                </span>
              </button>
            )}

            {/* Authentication Button */}
            {status === 'loading' ? (
              <div className="flex items-center justify-center w-[120px] h-[52px] px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm font-medium font-body">
                Loading...
              </div>
            ) : session ? (
              <Link
                href="/admin/dashboard"
                className="flex items-center justify-center w-[120px] h-[52px] px-4 py-2 bg-[#7C4DFF] text-white rounded-lg hover:bg-[#7C4DFF]/90 transition-colors text-sm font-medium gap-2 font-body"
              >
                <User className="w-4 h-4" />
                Dashboard
              </Link>
            ) : (
              <Link
                href="/admin/login"
                className="flex items-center justify-center w-[120px] h-[52px] px-4 py-2 bg-[#7C4DFF] text-white rounded-lg hover:bg-[#7C4DFF]/90 transition-colors text-sm font-medium gap-2 font-body"
              >
              
                SignUp
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-800 dark:text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-gray-800 dark:text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-border">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-gray-800 dark:text-white hover:text-[#7C4DFF] transition-colors text-base font-medium font-body"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Actions - Theme Toggle and Authentication */}
            <div className="flex gap-2 mx-4 mt-4">
              {/* Theme Toggle Mobile */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="flex-1 flex items-center justify-center h-12 px-3 py-3 bg-secondary/50 border border-[#7C4DFF] rounded-lg hover:bg-secondary hover:border-[#7C4DFF]/80 transition-all duration-200 text-sm font-medium text-foreground"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <Moon className="w-4 h-4 text-blue-500" />
                  )}
                  <span className="text-xs font-body">
                    {theme === 'dark' ? 'Light' : 'Dark'}
                  </span>
                </button>
              )}

              {/* Mobile Authentication Button */}
              {status === 'loading' ? (
                <div className="flex-1 flex items-center justify-center h-12 px-3 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm font-medium font-body">
                  Loading...
                </div>
              ) : session ? (
                <Link
                  href="/admin/dashboard"
                  className="flex-1 flex items-center justify-center h-12 px-3 py-3 bg-[#7C4DFF] text-white rounded-lg hover:bg-[#7C4DFF]/90 transition-colors text-sm font-medium gap-2 font-body"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/admin/login"
                  className="flex-1 flex items-center justify-center h-12 px-3 py-3 bg-[#7C4DFF] text-white rounded-lg hover:bg-[#7C4DFF]/90 transition-colors text-sm font-medium gap-2 font-body"
                  onClick={() => setIsOpen(false)}
                >
            
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
