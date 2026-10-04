import React from 'react';
import clsx from 'clsx';

const PriorityBadge = ({ priority, className = '' }) => {
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'low':
        return {
          label: 'Low',
          className: 'bg-gray-100 text-gray-800'
        };
      case 'medium':
        return {
          label: 'Medium',
          className: 'bg-yellow-100 text-yellow-800'
        };
      case 'high':
        return {
          label: 'High',
          className: 'bg-orange-100 text-orange-800'
        };
      case 'critical':
        return {
          label: 'Critical',
          className: 'bg-red-100 text-red-800'
        };
      default:
        return {
          label: priority,
          className: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const config = getPriorityConfig(priority);

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

export default PriorityBadge;
