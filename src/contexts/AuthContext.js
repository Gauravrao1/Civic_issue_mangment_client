// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const checkExistingAuth = () => {
      try {
        const storedUser = localStorage.getItem('civic_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        localStorage.removeItem('civic_user');
      } finally {
        setLoading(false);
      }
    };

    // Small delay to prevent flash
    setTimeout(checkExistingAuth, 100);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    
    try {
      // Simple demo validation
      if (credentials.email === 'admin@city.gov' && credentials.password === 'admin123') {
        const userData = {
          id: 1,
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@city.gov',
          role: 'admin',
          department: { name: 'Administration' }
        };
        
        // Store user
        localStorage.setItem('civic_user', JSON.stringify(userData));
        setUser(userData);
        
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials. Use: admin@city.gov / admin123' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('civic_user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};