'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Button from '@/components/ui/Button';
import { Select } from '@/components/ui/Input';
import classesData from '@/data/classes.json';
import studentsData from '@/data/students.json';
import coursesData from '@/data/courses.json';

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState('');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [presentStudents, setPresentStudents] = useState<string[]>([]);
  const [assignmentGiven, setAssignmentGiven] = useState(false);
  const [assignmentSubmissions, setAssignmentSubmissions] = useState<string[]>([]);
  const [isMarkingAttendance, setIsMarkingAttendance] = useState(false);

  const activeClasses = classesData.filter(c => c.status === 'active');
  const classOptions = [
    { value: '', label: 'Select a class' },
    ...activeClasses.map(cls => ({ value: cls.id, label: cls.title }))
  ];

  const selectedClassData = activeClasses.find(c => c.id === selectedClass);
  const classStudents = selectedClass ? studentsData.filter(s => s.enrolledClasses.includes(selectedClass)) : [];

  const getCourseLabel = (courseValue: string) => {
    const course = coursesData.find(c => c.value === courseValue);
    return course ? course.label : courseValue;
  };

  const handleStudentAttendance = (studentId: string) => {
    setPresentStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleAssignmentSubmission = (studentId: string) => {
    setAssignmentSubmissions(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleStartAttendance = () => {
    if (!selectedClass) return;
    setIsMarkingAttendance(true);
    setPresentStudents([]);
    setAssignmentSubmissions([]);
  };

  const handleSaveAttendance = () => {
    const attendanceData = {
      classId: selectedClass,
      date: attendanceDate,
      presentStudents,
      assignmentGiven,
      assignmentSubmissions: assignmentGiven ? assignmentSubmissions : []
    };
    console.log('Attendance saved:', attendanceData);
    setIsMarkingAttendance(false);
    setSelectedClass('');
    setAssignmentGiven(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-600">Mark attendance for your classes</p>
        </div>

        {!isMarkingAttendance ? (
          <div className="space-y-6">
            {/* Class Selection */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Class for Today</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <Select
                label="Class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                options={classOptions}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Date</label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <Button 
                onClick={handleStartAttendance}
                disabled={!selectedClass}
                className="h-fit"
              >
                Mark Attendance
              </Button>
            </div>

            {selectedClassData && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">{selectedClassData.title}</h4>
                <p className="text-sm text-gray-600">
                  {getCourseLabel(selectedClassData.course)} • {classStudents.length} students enrolled
                </p>
              </div>
            )}
            </div>

            {/* Export Attendance */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Attendance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <Select
                  label="Select Class/Batch"
                  value=""
                  onChange={() => {}}
                  options={[
                    { value: '', label: 'Select class to export' },
                    ...activeClasses.map(cls => ({ value: cls.id, label: cls.title })),
                    ...classesData.filter(c => c.status === 'completed').map(cls => ({ value: cls.id, label: `${cls.title} (Completed)` }))
                  ]}
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Date Range</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option value="all">All Time</option>
                    <option value="month">This Month</option>
                    <option value="week">This Week</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
                
                <Button 
                  variant="outline"
                  onClick={() => console.log('Export attendance')}
                  className="h-fit"
                >
                  📊 Export to Excel
                </Button>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>Export attendance records for selected class/batch including student names, dates, and attendance status.</p>
              </div>
            </div>
          </div>
        ) : (
          /* Attendance Marking */
          <div className="space-y-6">
            {/* Class Info */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedClassData?.title}</h3>
                  <p className="text-gray-600">{getCourseLabel(selectedClassData?.course || '')} • {attendanceDate}</p>
                </div>
                <Button variant="outline" onClick={() => setIsMarkingAttendance(false)}>
                  Cancel
                </Button>
              </div>
            </div>

            {/* Assignment Toggle */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="assignment-toggle"
                  checked={assignmentGiven}
                  onChange={(e) => setAssignmentGiven(e.target.checked)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="assignment-toggle" className="text-sm font-medium text-gray-900">
                  Assignment was given today
                </label>
              </div>
            </div>

            {/* Students List */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Students ({classStudents.length})
                </h3>
                <p className="text-sm text-gray-600">
                  Check students who are present{assignmentGiven ? ' and submitted assignment' : ''}
                </p>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  {classStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-500">{student.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        {/* Attendance Checkbox */}
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`attendance-${student.id}`}
                            checked={presentStudents.includes(student.id)}
                            onChange={() => handleStudentAttendance(student.id)}
                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`attendance-${student.id}`} className="text-sm text-gray-700">
                            Present
                          </label>
                        </div>

                        {/* Assignment Checkbox */}
                        {assignmentGiven && (
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`assignment-${student.id}`}
                              checked={assignmentSubmissions.includes(student.id)}
                              onChange={() => handleAssignmentSubmission(student.id)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`assignment-${student.id}`} className="text-sm text-gray-700">
                              Submitted
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{classStudents.length}</p>
                      <p className="text-sm text-gray-600">Total Students</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{presentStudents.length}</p>
                      <p className="text-sm text-gray-600">Present</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">{classStudents.length - presentStudents.length}</p>
                      <p className="text-sm text-gray-600">Absent</p>
                    </div>
                    {assignmentGiven && (
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{assignmentSubmissions.length}</p>
                        <p className="text-sm text-gray-600">Submitted</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSaveAttendance}>
                    Save Attendance
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}