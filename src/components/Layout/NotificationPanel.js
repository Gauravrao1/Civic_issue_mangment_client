import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { XMarkIcon, BellIcon } from '@heroicons/react/24/outline';
import { notificationsAPI } from '../../services/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import { formatDistanceToNow } from 'date-fns';

const NotificationPanel = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('all');

  const { data: notifications, isLoading } = useQuery(
    ['notifications', activeTab],
    () => notificationsAPI.getAll({ 
      isRead: activeTab === 'unread' ? false : undefined,
      limit: 50 
    }),
    {
      enabled: isOpen,
      refetchInterval: 30000, // Refetch every 30 seconds
    }
  );

  const { data: unreadCount } = useQuery(
    'notifications-unread-count',
    () => notificationsAPI.getUnreadCount(),
    {
      refetchInterval: 30000,
    }
  );

  const markAsReadMutation = useMutation(
    (id) => notificationsAPI.markAsRead(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notifications');
        queryClient.invalidateQueries('notifications-unread-count');
      },
    }
  );

  const markAllAsReadMutation = useMutation(
    () => notificationsAPI.markAllAsRead(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notifications');
        queryClient.invalidateQueries('notifications-unread-count');
      },
    }
  );

  const deleteMutation = useMutation(
    (id) => notificationsAPI.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notifications');
        queryClient.invalidateQueries('notifications-unread-count');
      },
    }
  );

  const handleMarkAsRead = (id) => {
    markAsReadMutation.mutate(id);
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'issue_created':
        return '🆕';
      case 'issue_assigned':
        return '👤';
      case 'issue_updated':
        return '📝';
      case 'issue_resolved':
        return '✅';
      case 'system':
        return '⚙️';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'issue_created':
        return 'text-blue-600';
      case 'issue_assigned':
        return 'text-yellow-600';
      case 'issue_updated':
        return 'text-orange-600';
      case 'issue_resolved':
        return 'text-green-600';
      case 'system':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75" onClick={onClose} />
      
      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="pointer-events-auto w-screen max-w-md">
          <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
            {/* Header */}
            <div className="bg-primary-700 px-4 py-6 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">Notifications</h2>
                <div className="ml-3 flex h-7 items-center">
                  <button
                    type="button"
                    className="rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="mt-4 flex space-x-1">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'all'
                      ? 'bg-white text-primary-700'
                      : 'text-primary-200 hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('unread')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'unread'
                      ? 'bg-white text-primary-700'
                      : 'text-primary-200 hover:text-white'
                  }`}
                >
                  Unread ({unreadCount?.data?.unreadCount || 0})
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="border-b border-gray-200 px-4 py-3">
              <button
                onClick={handleMarkAllAsRead}
                disabled={markAllAsReadMutation.isLoading}
                className="text-sm text-primary-600 hover:text-primary-500 disabled:opacity-50"
              >
                Mark all as read
              </button>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : notifications?.data?.notifications?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                  <BellIcon className="h-12 w-12 mb-4" />
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {notifications?.data?.notifications?.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        !notification.isRead ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <span className="text-lg">
                            {getNotificationIcon(notification.type)}
                          </span>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${getNotificationColor(notification.type)}`}>
                              {notification.title}
                            </p>
                            <div className="flex items-center space-x-2">
                              {!notification.isRead && (
                                <button
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="text-xs text-primary-600 hover:text-primary-500"
                                >
                                  Mark read
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(notification.id)}
                                className="text-xs text-gray-400 hover:text-gray-600"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">
                            {notification.message}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                          </p>
                          {notification.issue && (
                            <div className="mt-2">
                              <a
                                href={`/issues/${notification.issue.id}`}
                                className="text-xs text-primary-600 hover:text-primary-500"
                              >
                                View Issue: {notification.issue.title}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
