'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthNavbar from '@/components/AuthNavbar';
import Footer from '@/components/Footer';

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AuthNavbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Instructor Attendance
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your classes and track student attendance
            </p>
          </div>
          
          <div className="space-y-4">
            <Link
              href="/auth/login"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Login to Your Account
            </Link>
            
            <Link
              href="/auth/register"
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Create New Profile
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}