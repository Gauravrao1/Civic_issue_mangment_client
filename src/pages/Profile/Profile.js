import React, { useState } from 'react';
import { User, Calendar, Mail, Phone, MapPin } from 'lucide-react';

const Profile = () => {
  // Simulated employee data - in real app, this would come from authentication/API
  const [employeeData] = useState({
    name: "Gaurav Rao",
    employeeId: "EMP-2024-001",
    email: "gaurav.rao@company.com",
    phone: "+91 98765 43210",
    position: "Senior Technical Specialist",
    department: "IT Support",
    joinDate: "2022-03-15",
    location: "New Delhi"
  });

  // Simulated issues data - in real app, this would come from API
  const [issuesData] = useState({
    resolved: [
      { id: "ISS-001", title: "Network connectivity issue", date: "2024-09-10", priority: "High" },
      { id: "ISS-002", title: "Software installation request", date: "2024-09-08", priority: "Medium" },
      { id: "ISS-003", title: "Email configuration", date: "2024-09-05", priority: "Low" },
      { id: "ISS-004", title: "Printer setup", date: "2024-09-03", priority: "Medium" }
    ],
    pending: [
      { id: "ISS-005", title: "Hardware upgrade request", date: "2024-09-12", priority: "High" },
      { id: "ISS-006", title: "Access permission for new system", date: "2024-09-11", priority: "Medium" }
    ]
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Employee Information Card */}
      <div className="card">
        <div className="card-body">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{employeeData.name}</h2>
              <p className="text-sm text-gray-600">Employee ID: {employeeData.employeeId}</p>
              <p className="text-sm text-gray-600">{employeeData.position}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-700">{employeeData.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-700">{employeeData.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-700">{employeeData.location}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-700">Joined: {new Date(employeeData.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="card">
        <div className="card-body">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Issue Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{issuesData.resolved.length + issuesData.pending.length}</div>
              <div className="text-sm text-gray-600">Total Issues</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{issuesData.resolved.length}</div>
              <div className="text-sm text-gray-600">Resolved</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{issuesData.pending.length}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((issuesData.resolved.length / (issuesData.resolved.length + issuesData.pending.length)) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Resolution Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;