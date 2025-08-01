'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthNavbar from '@/components/AuthNavbar';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';

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
            <Input
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="4-digit PIN"
              name="pin"
              type="password"
              maxLength={4}
              value={formData.pin}
              onChange={handleChange}
              className="tracking-widest"
              placeholder="••••"
              required
            />

            <Input
              label="Confirm PIN"
              name="confirmPin"
              type="password"
              maxLength={4}
              value={formData.confirmPin}
              onChange={handleChange}
              className="tracking-widest"
              placeholder="••••"
              required
            />

            <Select
              label="Security Question"
              name="securityQuestion"
              value={formData.securityQuestion}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select a question' },
                { value: 'pet', label: "What was your first pet's name?" },
                { value: 'school', label: 'What elementary school did you attend?' },
                { value: 'city', label: 'In what city were you born?' },
                { value: 'mother', label: "What is your mother's maiden name?" }
              ]}
              required
            />

            <Input
              label="Security Answer"
              name="securityAnswer"
              type="text"
              value={formData.securityAnswer}
              onChange={handleChange}
              required
            />

            <Button type="submit" className="w-full" size="lg">
              Create Profile
            </Button>
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