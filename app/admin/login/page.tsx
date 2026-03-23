'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!email.trim()) {
      setError('Email is required');
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError('Password is required');
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn('credentials', {
        email: email.trim(),
        password: password.trim(),
        redirect: false,
        callbackUrl: '/admin/dashboard',
      });

      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          setError('Invalid email or password');
        } else {
          setError('Authentication failed. Please try again.');
        }
      } else if (result?.ok) {
        // Redirect to dashboard or callback URL
        const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') || '/admin/dashboard';
        window.location.href = callbackUrl;
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0D101D] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Login</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to access the admin dashboard
          </p>
         
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-[#15192D] rounded-lg border border-gray-200 dark:border-[#2D3554] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-50 dark:bg-[#0D101D] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-[#2D3554] rounded-lg bg-gray-50 dark:bg-[#0D101D] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF] focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#7C4DFF] text-white py-3 px-4 rounded-lg hover:bg-[#7C4DFF]/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-[#7C4DFF] hover:text-[#7C4DFF]/80 transition-colors"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}