import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { issuesAPI, departmentsAPI } from '../../services/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const IssueCreate = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const selectedDepartmentId = watch('departmentId');

  // Fetch departments and categories
  const { data: departmentsData } = useQuery(
    'departments',
    () => departmentsAPI.getAll()
  );

  const { data: categoriesData } = useQuery(
    ['categories', selectedDepartmentId],
    () => selectedDepartmentId ? departmentsAPI.getCategories(selectedDepartmentId) : null,
    {
      enabled: !!selectedDepartmentId,
    }
  );

  const createIssueMutation = useMutation(
    (data) => issuesAPI.create(data),
    {
      onSuccess: (response) => {
        toast.success('Issue created successfully!');
        navigate(`/issues/${response.data.issue.id}`);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to create issue');
      },
    }
  );

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    const issueData = {
      ...data,
      images: images,
      location: {
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        address: data.address
      }
    };
    createIssueMutation.mutate(issueData);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Issue</h1>
        <p className="mt-1 text-sm text-gray-500">
          Report a new civic issue for government attention
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Issue Information</h3>
          </div>
          <div className="card-body space-y-4">
            {/* Title */}
            <div>
              <label className="form-label">Title *</label>
              <input
                type="text"
                className={`form-input ${errors.title ? 'border-red-300' : ''}`}
                placeholder="Brief description of the issue"
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && (
                <p className="form-error">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="form-label">Description *</label>
              <textarea
                rows={4}
                className={`form-textarea ${errors.description ? 'border-red-300' : ''}`}
                placeholder="Detailed description of the issue"
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && (
                <p className="form-error">{errors.description.message}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="form-label">Department *</label>
              <select
                className={`form-select ${errors.departmentId ? 'border-red-300' : ''}`}
                {...register('departmentId', { required: 'Department is required' })}
              >
                <option value="">Select a department</option>
                {departmentsData?.data?.departments?.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              {errors.departmentId && (
                <p className="form-error">{errors.departmentId.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="form-label">Category *</label>
              <select
                className={`form-select ${errors.categoryId ? 'border-red-300' : ''}`}
                {...register('categoryId', { required: 'Category is required' })}
                disabled={!selectedDepartmentId}
              >
                <option value="">Select a category</option>
                {categoriesData?.data?.categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="form-error">{errors.categoryId.message}</p>
              )}
            </div>

            {/* Priority */}
            <div>
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                {...register('priority')}
              >
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Location</h3>
          </div>
          <div className="card-body space-y-4">
            <div>
              <label className="form-label">Address *</label>
              <input
                type="text"
                className={`form-input ${errors.address ? 'border-red-300' : ''}`}
                placeholder="Street address or landmark"
                {...register('address', { required: 'Address is required' })}
              />
              {errors.address && (
                <p className="form-error">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Latitude *</label>
                <input
                  type="number"
                  step="any"
                  className={`form-input ${errors.latitude ? 'border-red-300' : ''}`}
                  placeholder="e.g., 40.7128"
                  {...register('latitude', { 
                    required: 'Latitude is required',
                    min: { value: -90, message: 'Invalid latitude' },
                    max: { value: 90, message: 'Invalid latitude' }
                  })}
                />
                {errors.latitude && (
                  <p className="form-error">{errors.latitude.message}</p>
                )}
              </div>

              <div>
                <label className="form-label">Longitude *</label>
                <input
                  type="number"
                  step="any"
                  className={`form-input ${errors.longitude ? 'border-red-300' : ''}`}
                  placeholder="e.g., -74.0060"
                  {...register('longitude', { 
                    required: 'Longitude is required',
                    min: { value: -180, message: 'Invalid longitude' },
                    max: { value: 180, message: 'Invalid longitude' }
                  })}
                />
                {errors.longitude && (
                  <p className="form-error">{errors.longitude.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Images</h3>
          </div>
          <div className="card-body space-y-4">
            <div>
              <label className="form-label">Upload Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="form-input"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload up to 5 images (JPG, PNG, GIF)
              </p>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Citizen Information */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
          </div>
          <div className="card-body space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your name"
                  {...register('citizenName')}
                />
              </div>

              <div>
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="Your phone number"
                  {...register('citizenPhone')}
                />
              </div>
            </div>

            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="your.email@example.com"
                {...register('citizenEmail')}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/issues')}
            className="btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createIssueMutation.isLoading}
            className="btn-primary"
          >
            {createIssueMutation.isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Creating...
              </>
            ) : (
              'Create Issue'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IssueCreate;
