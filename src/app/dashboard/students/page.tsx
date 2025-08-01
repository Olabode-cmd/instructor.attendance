'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Button from '@/components/ui/Button';
import { AddStudentModal } from '@/components/modals';
import studentsData from '@/data/students.json';
import classesData from '@/data/classes.json';

export default function StudentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState(studentsData);

  const activeClasses = classesData.filter(c => c.status === 'active');
  const availableClasses = activeClasses.map(cls => ({ value: cls.id, label: cls.title }));

  const handleAddStudent = (data: any) => {
    const newStudent = {
      id: (students.length + 1).toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      enrolledClasses: data.enrolledClasses,
      attendanceRate: 100, // Default for new student
      assignmentCompletion: 100 // Default for new student
    };

    setStudents(prev => [...prev, newStudent]);
    setIsModalOpen(false);
  };
  const getClassNames = (classIds: string[]) => {
    return classIds.map(id => {
      const cls = classesData.find(c => c.id === id);
      return cls ? cls.title : 'Unknown Class';
    }).join(', ');
  };

  const getAttendanceStatus = (rate: number) => {
    if (rate >= 90) return { color: 'bg-green-100 text-green-800', text: 'Excellent' };
    if (rate >= 75) return { color: 'bg-yellow-100 text-yellow-800', text: 'Good' };
    return { color: 'bg-red-100 text-red-800', text: 'Poor' };
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Students</h1>
            <p className="text-gray-600">Manage student profiles and enrollment</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            + Add New Student
          </Button>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">All Students ({students.length})</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Search students..."
                  className="text-gray-900 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <select className="text-gray-900 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option>All Classes</option>
                  {classesData.filter(c => c.status === 'active').map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.title}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => {
                  const attendanceStatus = getAttendanceStatus(student.attendanceRate);
                  return (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.gender}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.email}</div>
                        <div className="text-sm text-gray-500">{student.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {getClassNames(student.enrolledClasses)}
                        </div>
                        <div className="text-sm text-gray-500">{student.enrolledClasses.length} classes</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{student.attendanceRate}%</div>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${attendanceStatus.color}`}>
                            {attendanceStatus.text}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.assignmentCompletion}% completion</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-red-600 h-2 rounded-full" 
                            style={{ width: `${student.assignmentCompletion}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-red-600 hover:text-red-900">Edit</button>
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                        <button className="text-gray-600 hover:text-gray-900">Remove</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h4 className="text-sm font-medium text-gray-500">High Performers</h4>
            <p className="text-2xl font-bold text-green-600">
              {students.filter(s => s.attendanceRate >= 90).length}
            </p>
            <p className="text-sm text-gray-600">90%+ attendance</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h4 className="text-sm font-medium text-gray-500">At Risk</h4>
            <p className="text-2xl font-bold text-red-600">
              {students.filter(s => s.attendanceRate < 75).length}
            </p>
            <p className="text-sm text-gray-600">Below 75% attendance</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h4 className="text-sm font-medium text-gray-500">Average Performance</h4>
            <p className="text-2xl font-bold text-blue-600">
              {students.length > 0 ? Math.round(students.reduce((acc, s) => acc + s.assignmentCompletion, 0) / students.length) : 0}%
            </p>
            <p className="text-sm text-gray-600">Assignment completion</p>
          </div>
        </div>

        <AddStudentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddStudent}
          availableClasses={availableClasses}
        />
      </div>
    </DashboardLayout>
  );
}