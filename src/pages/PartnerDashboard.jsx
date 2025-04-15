import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('partnerToken');
      
      if (!token) {
        navigate('/partner/login');
        return;
      }

      try {
        const response = await axios.get(
          'https://welin-dashboard-backend-493mx.ondigitalocean.app/api/auth/dashboard',
          {
            headers: {
              'Authorization': token
            }
          }
        );
        setDashboardData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
        if (err.response?.status === 401) {
          localStorage.removeItem('partnerToken');
          navigate('/partner/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('partnerToken');
    navigate('/partner/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#77DC4E] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
          <button
            onClick={() => navigate('/partner/login')}
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#77DC4E] hover:bg-[#68c344] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#77DC4E]"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Partner Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#77DC4E] hover:bg-[#68c344] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#77DC4E]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Welcome to your Dashboard</h2>
            {dashboardData && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Add your dashboard content here based on the API response */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Dashboard Data</h3>
                  <pre className="mt-2 text-sm text-gray-900 overflow-auto">
                    {JSON.stringify(dashboardData, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartnerDashboard; 