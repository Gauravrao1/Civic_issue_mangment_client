import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  changePassword: (currentPassword, newPassword) => 
    api.put('/auth/change-password', { currentPassword, newPassword }),
};

// Issues API
export const issuesAPI = {
  getAll: (params) => api.get('/issues', { params }),
  getById: (id) => api.get(`/issues/${id}`),
  create: (issueData) => {
    const formData = new FormData();
    
    // Add text fields
    Object.keys(issueData).forEach(key => {
      if (key !== 'images' && issueData[key] !== undefined && issueData[key] !== null) {
        if (typeof issueData[key] === 'object') {
          formData.append(key, JSON.stringify(issueData[key]));
        } else {
          formData.append(key, issueData[key]);
        }
      }
    });
    
    // Add images
    if (issueData.images && issueData.images.length > 0) {
      issueData.images.forEach((image, index) => {
        formData.append('images', image);
      });
    }
    
    return api.post('/issues', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  assign: (id, assignedTo, notes) => 
    api.put(`/issues/${id}/assign`, { assignedTo, notes }),
  updateStatus: (id, status, notes) => 
    api.put(`/issues/${id}/status`, { status, notes }),
  addComment: (id, comment, isInternal = false, attachments = []) => {
    const formData = new FormData();
    formData.append('comment', comment);
    formData.append('isInternal', isInternal);
    
    attachments.forEach((attachment, index) => {
      formData.append('attachments', attachment);
    });
    
    return api.post(`/issues/${id}/comments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  addResolution: (id, resolutionNotes, resolutionImages = []) => {
    const formData = new FormData();
    formData.append('resolutionNotes', resolutionNotes);
    
    resolutionImages.forEach((image, index) => {
      formData.append('resolutionImages', image);
    });
    
    return api.put(`/issues/${id}/resolution`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Users API
export const usersAPI = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
  getStats: () => api.get('/users/stats/overview'),
};

// Departments API
export const departmentsAPI = {
  getAll: (params) => api.get('/departments', { params }),
  getById: (id) => api.get(`/departments/${id}`),
  create: (departmentData) => api.post('/departments', departmentData),
  update: (id, departmentData) => api.put(`/departments/${id}`, departmentData),
  delete: (id) => api.delete(`/departments/${id}`),
  getCategories: (id) => api.get(`/departments/${id}/categories`),
  createCategory: (id, categoryData) => api.post(`/departments/${id}/categories`, categoryData),
  getStats: (id) => api.get(`/departments/${id}/stats`),
};

// Analytics API
export const analyticsAPI = {
  getOverview: (params) => api.get('/analytics/overview', { params }),
  getTrends: (params) => api.get('/analytics/trends', { params }),
  getHeatmap: (params) => api.get('/analytics/heatmap', { params }),
  getPerformance: (params) => api.get('/analytics/performance', { params }),
  getReports: (params) => api.get('/analytics/reports', { params }),
};

// Notifications API
export const notificationsAPI = {
  getAll: (params) => api.get('/notifications', { params }),
  getUnreadCount: () => api.get('/notifications/unread-count'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/mark-all-read'),
  delete: (id) => api.delete(`/notifications/${id}`),
  getStats: () => api.get('/notifications/stats'),
};

// Utility functions
export const getImageUrl = (filename) => {
  if (!filename) return null;
  if (filename.startsWith('http')) return filename;
  return `${API_BASE_URL.replace('/api', '')}/uploads/issues/${filename}`;
};

export const getAvatarUrl = (filename) => {
  if (!filename) return null;
  if (filename.startsWith('http')) return filename;
  return `${API_BASE_URL.replace('/api', '')}/uploads/avatars/${filename}`;
};

export default api;
