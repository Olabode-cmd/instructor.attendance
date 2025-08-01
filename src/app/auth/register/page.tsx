'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthNavbar from '@/components/AuthNavbar';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pin: '',
    confirmPin: '',
    securityQuestion: '',
    securityAnswer: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('pin') ? value.replace(/\D/g, '') : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.pin !== formData.confirmPin) {
      alert('PINs do not match');
      return;
    }
    // Store email in localStorage
    localStorage.setItem('userEmail', formData.email);
    // TODO: Implement registration logic
    console.log('Register:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AuthNavbar />
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create Profile</h2>
            <p className="mt-2 text-gray-600">Set up your instructor account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-gray-900">
                4-digit PIN
              </label>
              <input
                id="pin"
                name="pin"
                type="password"
                maxLength={4}
                value={formData.pin}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 text-center tracking-widest border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="••••"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPin" className="block text-sm font-medium text-gray-900">
                Confirm PIN
              </label>
              <input
                id="confirmPin"
                name="confirmPin"
                type="password"
                maxLength={4}
                value={formData.confirmPin}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 text-center tracking-widest border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="••••"
                required
              />
            </div>

            <div>
              <label htmlFor="securityQuestion" className="block text-sm font-medium text-gray-900">
                Security Question
              </label>
              <select
                id="securityQuestion"
                name="securityQuestion"
                value={formData.securityQuestion}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="">Select a question</option>
                <option value="pet">What was your first pet's name?</option>
                <option value="school">What elementary school did you attend?</option>
                <option value="city">In what city were you born?</option>
                <option value="mother">What is your mother's maiden name?</option>
              </select>
            </div>

            <div>
              <label htmlFor="securityAnswer" className="block text-sm font-medium text-gray-900">
                Security Answer
              </label>
              <input
                id="securityAnswer"
                name="securityAnswer"
                type="text"
                value={formData.securityAnswer}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Create Profile
            </button>
          </form>

          <div className="text-center">
            <Link
              href="/auth"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              ← Back to options
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}