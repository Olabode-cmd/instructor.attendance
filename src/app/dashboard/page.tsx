import DashboardLayout from '@/components/DashboardLayout';
import classesData from '@/data/classes.json';
import studentsData from '@/data/students.json';
import assignmentsData from '@/data/assignments.json';

export default function DashboardPage() {
  const activeClasses = classesData.filter(c => c.status === 'active');
  const completedBatches = classesData.filter(c => c.status === 'completed');
  const totalStudents = studentsData.length;
  const avgAttendance = Math.round(studentsData.reduce((acc, s) => acc + s.attendanceRate, 0) / studentsData.length);

  const recentAlerts = [
    { type: 'warning', message: 'John Eze has missed 3 consecutive classes', time: '2 hours ago' },
    { type: 'info', message: 'Python Basics Quiz due tomorrow', time: '1 day ago' },
    { type: 'danger', message: 'John Eze attendance below 75%', time: '3 days ago' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your classes.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <span className="text-2xl">🏫</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Classes</p>
                <p className="text-2xl font-bold text-gray-900">{activeClasses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Batches</p>
                <p className="text-2xl font-bold text-gray-900">{completedBatches.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
                <p className="text-2xl font-bold text-gray-900">{avgAttendance}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Classes */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Active Classes</h3>
            </div>
            <div className="p-6 space-y-4">
              {activeClasses.map((cls) => (
                <div key={cls.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{cls.title}</p>
                    <p className="text-sm text-gray-600">{cls.duration} months duration</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{cls.studentCount} students</p>
                    <p className="text-xs text-gray-500">Ends {cls.endDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
            </div>
            <div className="p-6 space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`p-1 rounded-full ${
                    alert.type === 'warning' ? 'bg-yellow-100' :
                    alert.type === 'danger' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    <span className="text-sm">
                      {alert.type === 'warning' ? '⚠️' : 
                       alert.type === 'danger' ? '🚨' : 'ℹ️'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-2xl mb-2">📝</span>
                <span className="text-sm font-medium text-gray-900">Take Attendance</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-2xl mb-2">👤</span>
                <span className="text-sm font-medium text-gray-900">Add Student</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-2xl mb-2">📊</span>
                <span className="text-sm font-medium text-gray-900">View Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}