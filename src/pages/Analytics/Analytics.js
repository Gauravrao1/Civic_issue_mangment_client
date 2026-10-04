import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, AlertTriangle, Users, CheckCircle, MapPin } from 'lucide-react';

const Analytics = () => {
  // Data from the images
  const monthlyTrendsData = [
    { month: 'Jan', submitted: 85, resolved: 75 },
    { month: 'Feb', submitted: 90, resolved: 82 },
    { month: 'Mar', submitted: 78, resolved: 70 },
    { month: 'Apr', submitted: 95, resolved: 88 },
    { month: 'May', submitted: 102, resolved: 95 },
    { month: 'Jun', submitted: 88, resolved: 82 }
  ];

  const issuesCategoryData = [
    { category: 'Infrastructure', count: 45 },
    { category: 'Sanitation', count: 38 },
    { category: 'Electricity', count: 22 },
    { category: 'Water Supply', count: 15 },
    { category: 'Public Safety', count: 12 }
  ];

  const priorityDistribution = [
    { name: 'High', value: 15, color: '#ef4444' },
    { name: 'Medium', value: 45, color: '#f59e0b' },
    { name: 'Low', value: 40, color: '#64748b' }
  ];

  const wardPerformance = [
    { ward: 'Ward 1', time: 24, target: 48, status: 'On Target' },
    { ward: 'Ward 2', time: 36, target: 48, status: 'On Target' },
    { ward: 'Ward 3', time: 18, target: 48, status: 'On Target' },
    { ward: 'Ward 4', time: 42, target: 48, status: 'On Target' },
    { ward: 'Ward 5', time: 30, target: 48, status: 'On Target' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="mt-1 text-sm text-gray-500">
            Comprehensive civic issues analysis
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
            <span>📊</span>
            <span>Export Data</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center space-x-2">
            <span>📋</span>
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
              <p className="text-3xl font-bold text-green-600">77%</p>
              <p className="text-sm text-green-600">+25% from last month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Resolution Time</p>
              <p className="text-3xl font-bold text-orange-600">30h</p>
              <p className="text-sm text-gray-500">Target: 48h</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Issues</p>
              <p className="text-3xl font-bold text-blue-600">31</p>
              <p className="text-sm text-gray-500">Pending resolution</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Staff Efficiency</p>
              <p className="text-3xl font-bold text-purple-600">87%</p>
              <p className="text-sm text-gray-500">Based on resolution time</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Issue Trends</h3>
          <p className="text-sm text-gray-500 mb-4">Submission and resolution patterns over time</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="resolved" 
                  stackId="1" 
                  stroke="#10b981" 
                  fill="#10b981" 
                />
                <Area 
                  type="monotone" 
                  dataKey="submitted" 
                  stackId="2" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ward Performance */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ward Performance</h3>
          <p className="text-sm text-gray-500 mb-4">Resolution time by ward</p>
          <div className="space-y-4">
            {wardPerformance.map((ward, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">{ward.ward}</span>
                    <span className="text-sm text-gray-600">{ward.time}h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(ward.time / ward.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">Target: {ward.target}h</span>
                    <span className="text-xs text-green-600 ml-2">{ward.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues by Category */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Issues by Category</h3>
          <p className="text-sm text-gray-500 mb-4">Distribution of reported issues across departments</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={issuesCategoryData} margin={{ bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="category" 
                  stroke="#666" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#666" />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Priority Distribution</h3>
          <p className="text-sm text-gray-500 mb-4">Issue classification by priority levels</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {priorityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {priorityDistribution.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <p className="text-sm text-gray-500 mb-6">AI-powered analysis of civic issue patterns</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-medium text-green-900">High Performance</h4>
                <p className="text-sm text-green-700 mt-1">
                  Ward 3 shows excellent resolution times, averaging 18 hours - 62% better than target.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <h4 className="font-medium text-orange-900">Trending Issue</h4>
                <p className="text-sm text-orange-700 mt-1">
                  Road infrastructure issues increased 23% this month, requiring additional resources.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-blue-900">Hotspot Alert</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Main Street area shows clustering of multiple issue types - recommend proactive inspection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;