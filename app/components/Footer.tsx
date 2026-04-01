'use client';

import Link from 'next/link';
import { Linkedin, Twitter, Mail, Facebook, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/shipon-chowdhury?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
    { icon: MessageCircle, href: 'https://m.me/Oxshipon', label: 'Messenger' },
    { icon: Mail, href: 'mailto:oxshipon1@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-white dark:bg-[#15192D] text-gray-700 dark:text-neutral-300 py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-[#2D3554]">
      <div className="max-w-6xl mx-auto">
        {/* Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-accent">Shipon Chowdhury</h3>
            <p className="text-gray-600 dark:text-neutral-400 text-sm font-body">
              Frontend Developer crafting seamless digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4 font-heading">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white hover:underline decoration-[#7C4DFF] decoration-2 underline-offset-4 transition-all text-sm font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4 font-heading">Services</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-neutral-400 font-body">
              <li className="hover:underline decoration-[#7C4DFF] decoration-2 underline-offset-4 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer">UX/UI Design</li>
              <li className="hover:underline decoration-[#7C4DFF] decoration-2 underline-offset-4 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer">User Research</li>
              <li className="hover:underline decoration-[#7C4DFF] decoration-2 underline-offset-4 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer">Prototyping</li>
              <li className="hover:underline decoration-[#7C4DFF] decoration-2 underline-offset-4 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer">Design Systems</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4 font-heading">Follow</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 bg-gray-200 dark:bg-neutral-800 rounded-lg hover:bg-[#7C4DFF] dark:hover:bg-[#7C4DFF] transition-all border border-gray-300 dark:border-[#2D3554]"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-gray-700 dark:text-white group-hover:text-white dark:group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-neutral-400 text-sm font-body">
              © {currentYear} Shipon Chowdhury. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white transition-colors font-body">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white transition-colors font-body">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </footer>
  );
}
