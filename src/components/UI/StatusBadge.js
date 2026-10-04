import React from 'react';
import clsx from 'clsx';

const StatusBadge = ({ status, className = '' }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'new':
        return {
          label: 'New',
          className: 'bg-blue-100 text-blue-800'
        };
      case 'assigned':
        return {
          label: 'Assigned',
          className: 'bg-yellow-100 text-yellow-800'
        };
      case 'in_progress':
        return {
          label: 'In Progress',
          className: 'bg-orange-100 text-orange-800'
        };
      case 'resolved':
        return {
          label: 'Resolved',
          className: 'bg-green-100 text-green-800'
        };
      case 'closed':
        return {
          label: 'Closed',
          className: 'bg-gray-100 text-gray-800'
        };
      case 'rejected':
        return {
          label: 'Rejected',
          className: 'bg-red-100 text-red-800'
        };
      default:
        return {
          label: status,
          className: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
