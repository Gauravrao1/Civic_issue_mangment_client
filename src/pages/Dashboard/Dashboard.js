// src/pages/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalIssues: 0,
    pendingReviews: 0,
    resolvedToday: 0
  });

  useEffect(() => {
    const fetchStats = () => {
      const mockStats = {
        totalIssues: Math.floor(Math.random() * 1000) + 20,
        pendingReviews: Math.floor(Math.random() * 500) + 5,
        resolvedToday: Math.floor(Math.random() * 50) + 3
      };
      setStats(mockStats);
    };
    fetchStats();
  }, [user?.department]);

  const quickActions = [
    { title: 'Create New Issue', icon: '➕', description: 'Report a new issue', href: '/issues/new', color: 'primary' },
    { title: 'View All Issues', icon: '📄', description: 'Browse existing issues', href: '/issues', color: 'success' },
    { title: 'Manage Users', icon: '👤', description: 'User administration', href: '/users', color: 'warning' },
    { title: 'View Reports', icon: '📊', description: 'Analytics & insights', href: '/analytics', color: 'primary' },
  ];

  const colorMap = {
    primary: { text: 'text-primary-600', bg: 'bg-primary-50', border: 'border-primary-200', hoverBg: 'hover:bg-primary-600 hover:text-white hover:border-primary-600' },
    success: { text: 'text-success-600', bg: 'bg-success-50', border: 'border-success-200', hoverBg: 'hover:bg-success-600 hover:text-white hover:border-success-600' },
    warning: { text: 'text-warning-600', bg: 'bg-warning-50', border: 'border-warning-200', hoverBg: 'hover:bg-warning-600 hover:text-white hover:border-warning-600' },
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          {user?.department?.name ? `${user.department.name} Department Overview` : 'System Overview'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Total Issues', value: stats.totalIssues, icon: '📋', color: 'text-primary-600', bg: 'bg-primary-50' },
          { title: 'Pending Reviews', value: stats.pendingReviews, icon: '⏳', color: 'text-warning-600', bg: 'bg-warning-50' },
          { title: 'Resolved Today', value: stats.resolvedToday, icon: '✅', color: 'text-success-600', bg: 'bg-success-50' },
        ].map((stat, index) => (
          <div
            key={index}
            className="card card-body flex items-center justify-between hover:shadow-lg transition-shadow duration-200"
          >
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {stat.title}
              </p>
              <p className={`text-3xl font-bold mt-1 ${stat.color}`}>
                {stat.value}
              </p>
            </div>
            <div className={`text-3xl ${stat.bg} p-3 rounded-xl`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const c = colorMap[action.color];
              return (
                <button
                  key={index}
                  onClick={() => navigate(action.href)}
                  className={`flex flex-col items-start p-5 rounded-lg border-2 ${c.border} ${c.text} ${c.hoverBg} transition-all duration-200 text-left group`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{action.icon}</span>
                    <span className="font-semibold text-sm">{action.title}</span>
                  </div>
                  <span className="text-xs opacity-70">{action.description}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-gray-900">User Information</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="text-gray-500">
                <span className="font-medium text-gray-700">Name:</span> {user?.firstName} {user?.lastName}
              </p>
              <p className="text-gray-500">
                <span className="font-medium text-gray-700">Email:</span> {user?.email}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-500">
                <span className="font-medium text-gray-700">Role:</span>{' '}
                <span className="capitalize">{user?.role?.replace('_', ' ')}</span>
              </p>
              <p className="text-gray-500">
                <span className="font-medium text-gray-700">Department:</span> {user?.department?.name || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;