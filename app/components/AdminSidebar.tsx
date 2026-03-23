'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Star, LogOut, Menu, X, FileDown, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Projects', href: '/admin/projects/new', icon: FileText },
    { label: 'Reviews', href: '/admin/dashboard/reviews', icon: Star },
    { label: 'CV Management', href: '/admin/cv', icon: FileDown },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-[#15192D] rounded-lg shadow-md"
      >
        {isOpen ? <X className="w-6 h-6 text-gray-900 dark:text-white" /> : <Menu className="w-6 h-6 text-gray-900 dark:text-white" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed border border-gray-200 dark:border-[#2D3554] left-0 md:left-[8%] top-0 h-screen w-72 bg-white dark:bg-[#15192D] text-gray-900 dark:text-white transition-all duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-neutral-800 flex flex-col items-center overflow-y-auto">
          <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-4 border-[#7C4DFF] mb-4">
            <Image
              src="/profile/ahsan.svg"
              alt="Rahik Admin"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-lg lg:text-xl font-bold font-heading text-center text-gray-900 dark:text-white">Rahik Admin</h2>
          <p className="text-gray-600 dark:text-neutral-400 text-xs lg:text-sm mt-1 text-center font-body">UX/UI Designer</p>
          
          {/* Go Back Button */}
          <Link
            href="/"
            className="mt-3 lg:mt-4 flex items-center gap-2 px-3 lg:px-4 py-2 bg-gray-100 dark:bg-[#0D101D] border border-gray-300 dark:border-[#2D3554] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-[#1A1F35] transition-colors text-xs lg:text-sm font-medium font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back Home
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4 lg:mt-6 px-3 lg:px-4 space-y-2 overflow-y-auto max-h-[calc(100vh-400px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-3 lg:py-4 transition-all duration-200 rounded-lg ${
                  active
                    ? 'bg-[#7C4DFF] text-white'
                    : 'border border-gray-300 dark:border-[#2D3554] text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="font-medium font-body text-sm lg:text-base">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 right-4 lg:right-6">
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center justify-center gap-2 px-3 lg:px-4 py-2 lg:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium font-body text-sm lg:text-base"
          >
            <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
