'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const pathname = usePathname();
  
  // Don't show on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const whatsappLink = 'https://wa.me/8801703059461?text=Hello%20I%20want%20to%20know%20more';

  return (
    <motion.div className="fixed bottom-6 right-6 z-40 flex items-center justify-center group">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-linear-to-br from-green-400 via-green-500 to-transparent opacity-30 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Button Link */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 rounded-full shadow-lg flex items-center justify-center cursor-pointer"
        aria-label="Contact us on WhatsApp"
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 10px 25px rgba(0, 0, 0, 0.2)',
            '0 15px 35px rgba(34, 197, 94, 0.4)',
            '0 10px 25px rgba(0, 0, 0, 0.2)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.15,
          boxShadow: '0 15px 40px rgba(34, 197, 94, 0.5)',
        }}
      >
        <Image
          src="/whatsApp/whatsApp.png"
          alt="WhatsApp"
          width={72}
          height={72}
          className="w-16 h-16"
        />
      </motion.a>

      {/* Tooltip */}
      <motion.span 
        className="absolute right-20 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
      >
        Message us on WhatsApp
      </motion.span>
    </motion.div>
  );
}
