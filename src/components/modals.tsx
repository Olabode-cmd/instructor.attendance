'use client';

import { ReactNode, useState } from 'react';
import { X } from 'lucide-react';
import Button from './ui/Button';
import { Input, Select } from './ui/Input';
import coursesData from '@/data/courses.json';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

function BaseModal({ isOpen, onClose, title, children }: BaseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gray-900/60 transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function AddClassModal({ isOpen, onClose, onSubmit }: AddClassModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    startDate: new Date().toISOString().split('T')[0],
    duration: 3
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', course: '', startDate: new Date().toISOString().split('T')[0], duration: 3 });
  };

  const calculateEndDate = (startDate: string, duration: number) => {
    const start = new Date(startDate);
    start.setMonth(start.getMonth() + duration);
    return start.toISOString().split('T')[0];
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add New Class">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Class Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g., Python Batch 2024-B"
          required
        />
        
        <Select
          label="Course"
          value={formData.course}
          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
          options={[{ value: '', label: 'Select a course' }, ...coursesData]}
          required
        />
        
        <Input
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          required
        />
        
        <Input
          label="Duration (months)"
          type="number"
          min="1"
          max="12"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
          required
        />
        
        <div className="text-sm text-gray-600">
          End Date: {calculateEndDate(formData.startDate, formData.duration)}
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Create Class
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  availableClasses: { value: string; label: string }[];
}

export function AddStudentModal({ isOpen, onClose, onSubmit, availableClasses }: AddStudentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    enrolledClasses: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', phone: '', gender: '', enrolledClasses: [] });
  };

  const handleClassToggle = (classId: string) => {
    setFormData(prev => ({
      ...prev,
      enrolledClasses: prev.enrolledClasses.includes(classId)
        ? prev.enrolledClasses.filter(id => id !== classId)
        : [...prev.enrolledClasses, classId]
    }));
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add New Student">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., John Doe"
          required
        />
        
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="john.doe@email.com"
          required
        />
        
        <Input
          label="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+2348012345678"
          required
        />
        
        <Select
          label="Gender"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          options={[
            { value: '', label: 'Select gender' },
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' }
          ]}
          required
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Enroll in Classes
          </label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {availableClasses.map((cls) => (
              <div key={cls.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`class-${cls.value}`}
                  checked={formData.enrolledClasses.includes(cls.value)}
                  onChange={() => handleClassToggle(cls.value)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor={`class-${cls.value}`} className="ml-2 text-sm text-gray-900">
                  {cls.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Add Student
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}