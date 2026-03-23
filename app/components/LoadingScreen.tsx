'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 500); // Small delay after reaching 100%
          return 100;
        }
        return prev + 2; // Increment by 2% every 50ms for smooth animation
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-[#0D101D] z-50 flex flex-col items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-[#15192D] via-[#0D101D] to-[#2D3554] opacity-90" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Profile Image with dance animation */}
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#7C4DFF] shadow-2xl animate-dance">
            <Image
              src="/profile/shipon.png"
              alt="Shipon Chowdhury"
              width={160}
              height={160}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          {/* Glowing ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#7C4DFF]/50 animate-ping" />
        </div>

        {/* Name */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white animate-fade-in font-accent">
           Shipon Chowdhury
          </h1>
          <p className="text-lg md:text-xl text-[#7C4DFF] font-medium animate-fade-in-delay font-body">
           Frontend Developer
           </p>
           <p className="text-sm md:text-base text-gray-400 animate-fade-in-delay font-body">
            Crafting seamless digital experiences with a blend of creativity and code.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-sm space-y-3">
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-[#7C4DFF] to-[#2D3554] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center">
            <span className="text-white text-sm font-medium font-body">
              Loading Experience... {progress}%
            </span>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-[#7C4DFF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-[#7C4DFF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-[#7C4DFF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}