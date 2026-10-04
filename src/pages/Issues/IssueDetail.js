import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { issuesAPI } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const IssueDetail = () => {
  const { id } = useParams();
  
  const { data: issueData, isLoading } = useQuery(
    ['issue', id],
    () => issuesAPI.getById(id),
    {
      enabled: !!id,
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const issue = issueData?.data?.issue;

  if (!issue) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Issue not found</h1>
        <p className="mt-2 text-gray-600">The issue you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{issue.title}</h1>
        <p className="mt-1 text-sm text-gray-500">Issue #{issue.id.slice(0, 8)}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
            </div>
            <div className="card-body">
              <p className="text-gray-700">{issue.description}</p>
            </div>
          </div>

          {/* Comments */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Comments</h3>
            </div>
            <div className="card-body">
              {issue.comments?.length > 0 ? (
                <div className="space-y-4">
                  {issue.comments.map((comment) => (
                    <div key={comment.id} className="border-l-4 border-gray-200 pl-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">
                            {comment.user?.firstName} {comment.user?.lastName}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {comment.isInternal && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            Internal
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-gray-700">{comment.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Priority */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Status</h3>
            </div>
            <div className="card-body space-y-4">
              <div>
                <label className="form-label">Current Status</label>
                <div className="mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {issue.status}
                  </span>
                </div>
              </div>
              <div>
                <label className="form-label">Priority</label>
                <div className="mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {issue.priority}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Issue Details */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Details</h3>
            </div>
            <div className="card-body space-y-4">
              <div>
                <label className="form-label">Category</label>
                <p className="text-sm text-gray-900">{issue.category?.name}</p>
                <p className="text-xs text-gray-500">{issue.category?.department?.name}</p>
              </div>
              
              {issue.assignedUser && (
                <div>
                  <label className="form-label">Assigned To</label>
                  <p className="text-sm text-gray-900">
                    {issue.assignedUser.firstName} {issue.assignedUser.lastName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {issue.assignedUser.role?.replace('_', ' ')}
                  </p>
                </div>
              )}

              <div>
                <label className="form-label">Created</label>
                <p className="text-sm text-gray-900">
                  {new Date(issue.createdAt).toLocaleDateString()}
                </p>
              </div>

              {issue.resolvedAt && (
                <div>
                  <label className="form-label">Resolved</label>
                  <p className="text-sm text-gray-900">
                    {new Date(issue.resolvedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          {issue.location && (
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900">Location</h3>
              </div>
              <div className="card-body">
                <p className="text-sm text-gray-900">{issue.location.address}</p>
                <p className="text-xs text-gray-500">
                  {issue.location.latitude}, {issue.location.longitude}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;
