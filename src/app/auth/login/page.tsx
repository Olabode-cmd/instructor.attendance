'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthNavbar from '@/components/AuthNavbar';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const [pin, setPin] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail') || 'obalogun@digitalfortressltd.com';
    setUserEmail(storedEmail);
    localStorage.setItem('userEmail', storedEmail);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      window.location.href = '/dashboard';
    } else {
      alert('Invalid PIN');
    }
  };

  const handleLogoutAccount = () => {
    localStorage.removeItem('userEmail');
    window.location.href = '/auth';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AuthNavbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            {userEmail && (
              <p className="mt-2 text-gray-800">
                Continue as <span className="font-semibold">{userEmail}</span>?
              </p>
            )}
            <p className="mt-2 text-gray-700">Enter your 4-digit PIN to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="sr-only">4-digit PIN</label>
              <div className="flex justify-center space-x-3">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    type="password"
                    maxLength={1}
                    value={pin[index] || ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      const newPin = pin.split('');
                      newPin[index] = value;
                      setPin(newPin.join('').slice(0, 4));
                      
                      // Auto-focus next input
                      if (value && index < 3) {
                        const nextInput = e.target.parentElement?.children[index + 1] as HTMLInputElement;
                        nextInput?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      // Handle backspace to focus previous input
                      if (e.key === 'Backspace' && !pin[index] && index > 0) {
                        const prevInput = e.target.parentElement?.children[index - 1] as HTMLInputElement;
                        prevInput?.focus();
                      }
                    }}
                    className="w-12 h-12 text-center text-xl font-bold text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={pin.length !== 4}
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Login
            </button>
          </form>

          <div className="text-center space-y-2">
            <Link
              href="/auth/forgot-pin"
              className="text-sm text-red-600 hover:text-red-800"
            >
              Forgot your PIN?
            </Link>
            <div className="space-y-1">
              {userEmail && (
                <button
                  onClick={handleLogoutAccount}
                  className="block w-full text-sm text-gray-700 hover:text-gray-900"
                >
                  Login to different account
                </button>
              )}
              <Link
                href="/auth"
                className="block text-sm text-gray-700 hover:text-gray-900"
              >
                ← Back to options
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}