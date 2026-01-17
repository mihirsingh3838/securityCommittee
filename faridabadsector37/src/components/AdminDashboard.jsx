import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import {
  MembersManager,
  PaymentsManager,
  OccupantsManager,
  GuardsManager,
  SuggestionsManager,
  ComplaintsManager
} from './admin/Managers.jsx';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('announcements');
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const admin = JSON.parse(localStorage.getItem('adminData') || '{}');
    
    if (!token) {
      navigate('/admin/login');
      return;
    }

    setAdminData(admin);
    verifyToken(token);
  }, [navigate]);

  const verifyToken = async (token) => {
    try {
      await api.get('/admin/verify');
      setLoading(false);
    } catch (error) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      navigate('/admin/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'announcements', label: 'Announcements', icon: '📣' },
    { id: 'members', label: 'Members', icon: '👥' },
    { id: 'payments', label: 'Payments', icon: '💰' },
    { id: 'occupants', label: 'Occupants', icon: '🏠' },
    { id: 'guards', label: 'Guards', icon: '🛡️' },
    { id: 'suggestions', label: 'Suggestions', icon: '💬' },
    { id: 'complaints', label: 'Complaints', icon: '🚨' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, {adminData?.username}</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                View Site
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'announcements' && <AnnouncementsManager />}
        {activeTab === 'members' && <MembersManager />}
        {activeTab === 'payments' && <PaymentsManager />}
        {activeTab === 'occupants' && <OccupantsManager />}
        {activeTab === 'guards' && <GuardsManager />}
        {activeTab === 'suggestions' && <SuggestionsManager />}
        {activeTab === 'complaints' && <ComplaintsManager />}
      </main>
    </div>
  );
};

// Announcements Manager Component
const AnnouncementsManager = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    important: false,
    links: [],
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await api.get('/announcements');
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    try {
      if (formData._id) {
        await api.put(
          `/announcements/${formData._id}`,
          formData
        );
      } else {
        await api.post(
          '/announcements',
          formData
        );
      }
      fetchAnnouncements();
      setShowForm(false);
      setFormData({ title: '', content: '', important: false, links: [] });
    } catch (error) {
      alert('Error saving announcement');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      await api.delete(`/announcements/${id}`);
      fetchAnnouncements();
    } catch (error) {
      alert('Error deleting announcement');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Manage Announcements</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : '+ Add Announcement'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows={4}
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.important}
                onChange={(e) => setFormData({ ...formData, important: e.target.checked })}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">Important</label>
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Content</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Important</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {announcements.map((announcement) => (
              <tr key={announcement._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{announcement.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{announcement.content?.substring(0, 50)}...</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {announcement.important ? '✓' : ''}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => {
                      setFormData(announcement);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(announcement._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
