import React, { useState } from 'react';
import { MapPin, Clock, User, Phone, Mail, Camera, Send, Filter, Search, MoreHorizontal, Eye, CheckSquare, Square } from 'lucide-react';

const Users = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [filterStatus, setFilterStatus] = useState('All Status');

  // Sample issues data
  const [issues, setIssues] = useState([
    {
      id: 'ISS-001',
      title: 'Pothole on Main Street',
      description: 'Large pothole causing traffic issues',
      location: 'Main Street, Ward 5',
      coordinates: { lat: 26.8467, lng: 80.9462 },
      reportedBy: {
        name: 'Rajesh Kumar',
        phone: '+91 9876543210',
        email: 'rajesh.kumar@email.com',
        address: '123 Main Street, Ward 5'
      },
      date: '1/15/2024',
      status: 'new',
      priority: 'high',
      category: 'Roads & Infrastructure',
      assignedTo: null,
      images: ['pothole1.jpg', 'pothole2.jpg'],
      department: null,
      isResolved: false
    },
    {
      id: 'ISS-002',
      title: 'Streetlight not working',
      description: 'Streetlight has been out for 3 days',
      location: 'Oak Avenue, Ward 3',
      coordinates: { lat: 26.8567, lng: 80.9562 },
      reportedBy: {
        name: 'Priya Sharma',
        phone: '+91 9876543211',
        email: 'priya.sharma@email.com',
        address: '456 Oak Avenue, Ward 3'
      },
      date: '1/14/2024',
      status: 'assigned',
      priority: 'medium',
      category: 'Electricity',
      images: ['streetlight1.jpg'],
      department: 'Electricity Department',
      isResolved: false
    },
    {
      id: 'ISS-003',
      title: 'Garbage not collected',
      description: 'Garbage bins overflowing for 2 days',
      location: 'Pine Street, Ward 2',
      coordinates: { lat: 26.8367, lng: 80.9362 },
      reportedBy: {
        name: 'Amit Verma',
        phone: '+91 9876543212',
        email: 'amit.verma@email.com',
        address: '789 Pine Street, Ward 2'
      },
      date: '1/13/2024',
      status: 'in progress',
      priority: 'medium',
      category: 'Sanitation',
      images: ['garbage1.jpg', 'garbage2.jpg'],
      department: 'Sanitation Department',
      isResolved: false
    },
    {
      id: 'ISS-004',
      title: 'Water supply disruption',
      description: 'No water supply for entire block',
      location: 'Elm Street, Ward 1',
      coordinates: { lat: 26.8267, lng: 80.9262 },
      reportedBy: {
        name: 'Sunita Devi',
        phone: '+91 9876543213',
        email: 'sunita.devi@email.com',
        address: '321 Elm Street, Ward 1'
      },
      date: '1/12/2024',
      status: 'resolved',
      priority: 'urgent',
      category: 'Water Supply',
      images: ['water1.jpg'],
      department: 'Water Supply Department',
      isResolved: true
    }
  ]);

  const departments = [
    'Municipal Corporation',
    'Road Works Department',
    'Electricity Department',
    'Sanitation Department',
    'Water Supply Department',
    'Public Safety Department',
    'Parks & Recreation Department',
    'Health Department',
    'Fire Department'
  ];

  const staffMembers = [
    'John Smith',
    'Maria Garcia',
    'David Johnson',
    'Sarah Wilson',
    'Mike Brown',
    'Lisa Davis'
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'in progress': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.reportedBy.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All Categories' || issue.category === filterCategory;
    const matchesStatus = filterStatus === 'All Status' || issue.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleResolveToggle = (issueId) => {
    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === issueId 
          ? { 
              ...issue, 
              isResolved: !issue.isResolved,
              status: !issue.isResolved ? 'resolved' : 'assigned'
            }
          : issue
      )
    );
  };

  const handleAssignDepartment = (issueId, department, staffMember) => {
    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === issueId 
          ? { 
              ...issue, 
              department: department,
              assignedTo: staffMember,
              status: 'assigned'
            }
          : issue
      )
    );
    setShowAssignModal(false);
  };

  const IssueDetailModal = ({ issue, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{issue.title}</h2>
              <p className="text-gray-600 mt-1">Issue ID: {issue.id}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Issue Details */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Issue Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{issue.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Reported on {issue.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                      {issue.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                      {issue.priority}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">{issue.description}</p>
                  </div>
                </div>
              </div>

              {/* Reporter Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Reported By</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">{issue.reportedBy.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{issue.reportedBy.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{issue.reportedBy.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{issue.reportedBy.address}</span>
                  </div>
                </div>
              </div>

              {/* Resolution Status */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Resolution Status</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <button 
                    onClick={() => handleResolveToggle(issue.id)}
                    className="flex items-center space-x-3 w-full text-left"
                  >
                    {issue.isResolved ? (
                      <CheckSquare className="w-5 h-5 text-green-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400" />
                    )}
                    <span className={`font-medium ${issue.isResolved ? 'text-green-800' : 'text-gray-700'}`}>
                      {issue.isResolved ? 'Issue Resolved' : 'Mark as Resolved'}
                    </span>
                  </button>
                  {issue.isResolved && (
                    <p className="text-sm text-green-600 mt-2 ml-8">
                      This issue has been marked as resolved
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Images and Assignment */}
            <div className="space-y-6">
              {/* Problem Images */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Problem Images</h3>
                <div className="grid grid-cols-2 gap-2">
                  {issue.images.map((image, index) => (
                    <div key={index} className="bg-gray-200 rounded-lg h-32 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                      <span className="text-xs text-gray-500 ml-2">{image}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assignment */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Department Assignment</h3>
                <div className="space-y-3">
                  {issue.department ? (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-800">Assigned to: {issue.department}</p>
                      {issue.assignedTo && (
                        <p className="text-sm text-green-600">Staff: {issue.assignedTo}</p>
                      )}
                    </div>
                  ) : (
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-sm text-yellow-800">Not yet assigned to department</p>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => setShowAssignModal(true)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Assign/Reassign Department</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AssignmentModal = ({ issue, onClose, onAssign }) => {
    const [selectedDepartment, setSelectedDepartment] = useState(issue?.department || '');
    const [selectedStaff, setSelectedStaff] = useState(issue?.assignedTo || '');

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-md w-full mx-4">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Assign to Department</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Department
                </label>
                <select 
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign Staff Member
                </label>
                <select 
                  value={selectedStaff}
                  onChange={(e) => setSelectedStaff(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose Staff Member</option>
                  {staffMembers.map(staff => (
                    <option key={staff} value={staff}>{staff}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button 
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => onAssign(issue.id, selectedDepartment, selectedStaff)}
                disabled={!selectedDepartment}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Issue Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage civic issues reported by users and assign them to departments
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option>All Categories</option>
              <option>Roads & Infrastructure</option>
              <option>Electricity</option>
              <option>Sanitation</option>
              <option>Water Supply</option>
              <option>Public Safety</option>
              <option>Parks & Recreation</option>
              <option>Health</option>
            </select>

            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option>All Status</option>
              <option>new</option>
              <option>assigned</option>
              <option>in progress</option>
              <option>resolved</option>
            </select>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Advanced Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        <div className="text-sm text-gray-500 mb-4">
          Showing {filteredIssues.length} issues
        </div>
        
        {filteredIssues.map((issue) => (
          <div 
            key={issue.id} 
            className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <button 
                    onClick={() => handleResolveToggle(issue.id)}
                    className="flex-shrink-0"
                  >
                    {issue.isResolved ? (
                      <CheckSquare className="w-5 h-5 text-green-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                  <h3 className={`font-semibold ${issue.isResolved ? 'text-green-800' : 'text-gray-900'}`}>
                    {issue.title}
                  </h3>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2 ml-8">
                  <MapPin className="w-4 h-4" />
                  <span>{issue.location}</span>
                  <span>•</span>
                  <span>ID: {issue.id}</span>
                  <span>•</span>
                  <span>{issue.date}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 ml-8">{issue.description}</p>
                
                <div className="flex items-center space-x-2 mb-3 ml-8">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                    {issue.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                    {issue.priority}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                    {issue.category}
                  </span>
                  {issue.isResolved && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      ✓ Resolved
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600 ml-8">
                  <User className="w-4 h-4" />
                  <span>Reported by: {issue.reportedBy.name}</span>
                  {issue.assignedTo && (
                    <>
                      <span>•</span>
                      <span>Assigned to: {issue.assignedTo}</span>
                    </>
                  )}
                  {issue.department && (
                    <>
                      <span>•</span>
                      <span>Dept: {issue.department}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setSelectedIssue(issue)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {selectedIssue && (
        <IssueDetailModal 
          issue={selectedIssue} 
          onClose={() => setSelectedIssue(null)} 
        />
      )}

      {showAssignModal && selectedIssue && (
        <AssignmentModal 
          issue={selectedIssue}
          onClose={() => setShowAssignModal(false)}
          onAssign={handleAssignDepartment}
        />
      )}
    </div>
  );
};

export default Users;