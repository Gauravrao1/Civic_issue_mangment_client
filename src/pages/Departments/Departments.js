import React, { useState } from 'react';
import { Building2, CheckCircle, Clock, ArrowLeft, MapPin, Calendar, User, FileText, Camera } from 'lucide-react';

const Departments = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Enhanced departments data with detailed issues
  const departments = [
    {
      id: 1,
      name: "Infrastructure",
      subtitle: "Roads, Bridges, Drainage",
      category: "Infrastructure",
      totalIssues: 156,
      resolved: 98,
      pending: 58,
      color: "bg-blue-500",
      issues: [
        {
          id: 101,
          title: "Pothole on MG Road near City Mall",
          status: "resolved",
          priority: "high",
          assignedTo: "Road Repair Team A",
          reportedBy: "Rajesh Kumar",
          reportedDate: "2024-09-10",
          resolvedDate: "2024-09-14",
          location: "MG Road, Sector 15",
          description: "Large pothole causing traffic disruption and vehicle damage",
          image: "https://www.shutterstock.com/image-photo/damaged-american-road-surface-deep-600nw-2331927237.jpg",
          afterImage: "https://via.placeholder.com/300x200?text=Road+Repaired",
          cost: "₹25,000"
        },
        {
          id: 102,
          title: "Broken drainage pipe flooding street",
          status: "resolved",
          priority: "urgent",
          assignedTo: "Drainage Team B",
          reportedBy: "Priya Sharma",
          reportedDate: "2024-09-08",
          resolvedDate: "2024-09-12",
          location: "Civil Lines, Block C",
          description: "Major drainage pipe burst causing street flooding",
          image: "https://via.placeholder.com/300x200?text=Flooding+Issue",
          afterImage: "https://via.placeholder.com/300x200?text=Drainage+Fixed",
          cost: "₹45,000"
        },
        {
          id: 103,
          title: "Bridge railing damage at Metro Bridge",
          status: "pending",
          priority: "medium",
          assignedTo: "Bridge Maintenance Team",
          reportedBy: "Amit Singh",
          reportedDate: "2024-09-15",
          location: "Metro Bridge, Station Road",
          description: "Safety railing damaged, needs immediate repair",
          image: "https://via.placeholder.com/300x200?text=Bridge+Damage",
          estimatedCost: "₹30,000"
        }
      ]
    },
    {
      id: 2,
      name: "Roads & Traffic",
      subtitle: "Potholes, Signals, Jams, Parking",
      category: "Traffic Management",
      totalIssues: 203,
      resolved: 145,
      pending: 58,
      color: "bg-green-500",
      issues: [
        {
          id: 201,
          title: "Traffic signal malfunction at Main Chowk",
          status: "resolved",
          priority: "urgent",
          assignedTo: "Traffic Signal Team",
          reportedBy: "Traffic Police",
          reportedDate: "2024-09-12",
          resolvedDate: "2024-09-13",
          location: "Main Chowk Intersection",
          description: "Traffic lights not working causing major jams",
          image: "https://via.placeholder.com/300x200?text=Signal+Problem",
          afterImage: "https://via.placeholder.com/300x200?text=Signal+Working",
          cost: "₹15,000"
        },
        {
          id: 202,
          title: "Illegal parking blocking fire exit",
          status: "pending",
          priority: "high",
          assignedTo: "Traffic Enforcement Team",
          reportedBy: "Fire Department",
          reportedDate: "2024-09-16",
          location: "Commercial Complex, Sector 10",
          description: "Vehicles parked illegally blocking emergency access",
          image: "https://via.placeholder.com/300x200?text=Illegal+Parking",
          estimatedAction: "Issue challans and towing"
        }
      ]
    },
    {
      id: 3,
      name: "Waste Management",
      subtitle: "Garbage Collection, Disposal, Sanitation",
      category: "Sanitation",
      totalIssues: 134,
      resolved: 89,
      pending: 45,
      color: "bg-yellow-500",
      issues: [
        {
          id: 301,
          title: "Overflowing garbage bins in residential area",
          status: "resolved",
          priority: "medium",
          assignedTo: "Waste Collection Team C",
          reportedBy: "Residents Association",
          reportedDate: "2024-09-11",
          resolvedDate: "2024-09-13",
          location: "Green Park Society",
          description: "Multiple garbage bins overflowing for 3 days",
          image: "https://via.placeholder.com/300x200?text=Overflowing+Bins",
          afterImage: "https://via.placeholder.com/300x200?text=Clean+Area",
          cost: "₹8,000"
        },
        {
          id: 302,
          title: "Illegal dumping ground cleanup required",
          status: "pending",
          priority: "high",
          assignedTo: "Special Cleanup Team",
          reportedBy: "Environmental Officer",
          reportedDate: "2024-09-14",
          location: "Behind Industrial Area",
          description: "Large illegal waste dump affecting local environment",
          image: "https://via.placeholder.com/300x200?text=Illegal+Dump",
          estimatedCost: "₹75,000"
        }
      ]
    },
    {
      id: 4,
      name: "Public Transportation",
      subtitle: "Buses, Auto Stands, Last-mile Issues",
      category: "Transport",
      totalIssues: 87,
      resolved: 62,
      pending: 25,
      color: "bg-red-500",
      issues: [
        {
          id: 401,
          title: "Bus stop shelter damaged by storm",
          status: "resolved",
          priority: "medium",
          assignedTo: "Bus Stop Maintenance",
          reportedBy: "Commuter Group",
          reportedDate: "2024-09-09",
          resolvedDate: "2024-09-15",
          location: "Bus Stop, College Road",
          description: "Bus shelter roof collapsed, passengers exposed to weather",
          image: "https://via.placeholder.com/300x200?text=Damaged+Shelter",
          afterImage: "https://via.placeholder.com/300x200?text=New+Shelter",
          cost: "₹35,000"
        }
      ]
    },
    {
      id: 5,
      name: "Utilities",
      subtitle: "Water Supply, Electricity Outages",
      category: "Utilities",
      totalIssues: 167,
      resolved: 134,
      pending: 33,
      color: "bg-purple-500",
      issues: [
        {
          id: 501,
          title: "Water supply disruption in residential colony",
          status: "resolved",
          priority: "urgent",
          assignedTo: "Water Supply Team",
          reportedBy: "Colony Residents",
          reportedDate: "2024-09-13",
          resolvedDate: "2024-09-14",
          location: "Sunrise Colony",
          description: "No water supply for 24 hours due to pipeline leak",
          image: "https://via.placeholder.com/300x200?text=Pipeline+Leak",
          afterImage: "https://via.placeholder.com/300x200?text=Restored+Supply",
          cost: "₹22,000"
        },
        {
          id: 502,
          title: "Power outage affecting street lights",
          status: "pending",
          priority: "high",
          assignedTo: "Electrical Maintenance",
          reportedBy: "Security Guard",
          reportedDate: "2024-09-16",
          location: "Park Avenue",
          description: "Street lights not working, affecting safety",
          image: "https://via.placeholder.com/300x200?text=Dark+Street",
          estimatedCost: "₹18,000"
        }
      ]
    },
    {
      id: 6,
      name: "Health & Hygiene",
      subtitle: "Sewage, Drainage, Sanitation",
      category: "Health",
      totalIssues: 98,
      resolved: 72,
      pending: 26,
      color: "bg-pink-500",
      issues: [
        {
          id: 601,
          title: "Sewage overflow near school",
          status: "resolved",
          priority: "urgent",
          assignedTo: "Sewage Maintenance Team",
          reportedBy: "School Principal",
          reportedDate: "2024-09-10",
          resolvedDate: "2024-09-12",
          location: "Government School, Sector 8",
          description: "Sewage overflow creating health hazard for students",
          image: "https://via.placeholder.com/300x200?text=Sewage+Overflow",
          afterImage: "https://via.placeholder.com/300x200?text=Clean+Drainage",
          cost: "₹28,000"
        },
        {
          id: 602,
          title: "Stagnant water breeding mosquitoes",
          status: "pending",
          priority: "medium",
          assignedTo: "Vector Control Team",
          reportedBy: "Health Inspector",
          reportedDate: "2024-09-15",
          location: "Low-lying Area, Ward 12",
          description: "Stagnant water creating mosquito breeding ground",
          image: "https://via.placeholder.com/300x200?text=Stagnant+Water",
          estimatedAction: "Drain water and spray anti-mosquito treatment"
        }
      ]
    }
  ];

  const getResolutionRate = (resolved, total) => {
    return Math.round((resolved / total) * 100);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (selectedDepartment) {
    const dept = departments.find(d => d.id === selectedDepartment);
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSelectedDepartment(null)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Departments</span>
          </button>
          <div className="h-6 border-l border-gray-300"></div>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${dept.color} rounded-lg flex items-center justify-center`}>
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{dept.name}</h1>
              <p className="text-sm text-gray-500">{dept.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Department Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card">
            <div className="card-body text-center">
              <div className="text-2xl font-bold text-gray-900">{dept.totalIssues}</div>
              <div className="text-sm text-gray-600">Total Issues</div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="text-2xl font-bold text-green-600">{dept.resolved}</div>
              <div className="text-sm text-gray-600">Resolved</div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="text-2xl font-bold text-yellow-600">{dept.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="text-2xl font-bold text-blue-600">
                {getResolutionRate(dept.resolved, dept.totalIssues)}%
              </div>
              <div className="text-sm text-gray-600">Resolution Rate</div>
            </div>
          </div>
        </div>

        {/* Issues List */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Issues & Reports</h2>
          
          {dept.issues.map((issue) => (
            <div key={issue.id} className="card">
              <div className="card-body">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Issue Details */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            issue.status === 'resolved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {issue.status === 'resolved' ? 'Resolved' : 'Pending'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                            {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)} Priority
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600">{issue.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{issue.location}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Assigned to:</span>
                        <span className="font-medium">{issue.assignedTo}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Reported:</span>
                        <span className="font-medium">{issue.reportedDate}</span>
                      </div>

                      {issue.resolvedDate && (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600">Resolved:</span>
                          <span className="font-medium">{issue.resolvedDate}</span>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Reported by:</span>
                        <span className="font-medium">{issue.reportedBy}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Cost:</span>
                        <span className="font-medium text-green-600">
                          {issue.cost || issue.estimatedCost || 'Estimating...'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Camera className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-600">
                          {issue.status === 'resolved' ? 'Before' : 'Current Condition'}
                        </span>
                      </div>
                      <img 
                        src={issue.image} 
                        alt="Issue condition" 
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    </div>

                    {issue.afterImage && (
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-gray-600">After Resolution</span>
                        </div>
                        <img 
                          src={issue.afterImage} 
                          alt="After resolution" 
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                      </div>
                    )}

                    {issue.status === 'pending' && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">In Progress</span>
                        </div>
                        <p className="text-xs text-yellow-700 mt-1">
                          {issue.estimatedAction || 'Team working on resolution'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Civic Departments</h1>
        <p className="mt-1 text-sm text-gray-500">
          Click on any department to view detailed issue reports and resolutions
        </p>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div 
            key={dept.id} 
            className="card hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
            onClick={() => setSelectedDepartment(dept.id)}
          >
            <div className="card-body">
              {/* Department Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 ${dept.color} rounded-lg flex items-center justify-center`}>
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{dept.name}</h3>
                  <p className="text-xs text-gray-500">{dept.subtitle}</p>
                </div>
              </div>

              {/* Statistics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Issues</span>
                  <span className="font-semibold text-gray-900">{dept.totalIssues}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Resolved</span>
                  </div>
                  <span className="font-semibold text-green-600">{dept.resolved}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                  <span className="font-semibold text-yellow-600">{dept.pending}</span>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Resolution Rate</span>
                    <span className="text-xs font-medium text-gray-700">
                      {getResolutionRate(dept.resolved, dept.totalIssues)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getResolutionRate(dept.resolved, dept.totalIssues)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="card">
        <div className="card-body">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Overall Department Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {departments.reduce((sum, dept) => sum + dept.totalIssues, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Issues</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {departments.reduce((sum, dept) => sum + dept.resolved, 0)}
              </div>
              <div className="text-sm text-gray-600">Resolved</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {departments.reduce((sum, dept) => sum + dept.pending, 0)}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((departments.reduce((sum, dept) => sum + dept.resolved, 0) / 
                departments.reduce((sum, dept) => sum + dept.totalIssues, 0)) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Overall Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;