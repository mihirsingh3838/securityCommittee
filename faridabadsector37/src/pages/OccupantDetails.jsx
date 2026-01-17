import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const OccupantDetails = () => {
  const [occupants, setOccupants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('houseNo');

  useEffect(() => {
    fetchOccupants();
  }, []);

  const fetchOccupants = async () => {
    setLoading(true);
    try {
      const response = await api.get('/occupants');
      if (response.data) {
        setOccupants(response.data);
      }
    } catch (error) {
      console.error('Error fetching occupants:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedOccupants = occupants
    .filter((occupant) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        occupant.houseNo?.toLowerCase().includes(searchLower) ||
        occupant.name?.toLowerCase().includes(searchLower) ||
        occupant.mobile?.includes(searchTerm) ||
        occupant.occupation?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'houseNo') {
        return parseInt(a.houseNo || 0) - parseInt(b.houseNo || 0);
      }
      if (sortBy === 'name') {
        return (a.name || '').localeCompare(b.name || '');
      }
      if (sortBy === 'duration') {
        return (
          new Date(b.moveInDate || 0) - new Date(a.moveInDate || 0)
        );
      }
      return 0;
    });

  const calculateDuration = (moveInDate) => {
    if (!moveInDate) return 'N/A';
    const date = new Date(moveInDate);
    const now = new Date();
    const years = now.getFullYear() - date.getFullYear();
    const months = now.getMonth() - date.getMonth();
    const totalMonths = years * 12 + months;
    
    if (totalMonths < 12) {
      return `${totalMonths} month${totalMonths !== 1 ? 's' : ''}`;
    }
    const remainingMonths = totalMonths % 12;
    if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    }
    return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Occupant Details
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Current occupants & durations
        </p>
      </div>

      {/* Search and Sort Section */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-4 md:mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by House No, Name, Mobile, or Occupation..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="houseNo">House Number</option>
              <option value="name">Name</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-4 text-white">
          <p className="text-blue-100 text-sm font-medium">Total Occupants</p>
          <p className="text-3xl font-bold mt-1">{occupants.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md p-4 text-white">
          <p className="text-green-100 text-sm font-medium">Active Houses</p>
          <p className="text-3xl font-bold mt-1">
            {new Set(occupants.map((o) => o.houseNo)).size}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md p-4 text-white">
          <p className="text-purple-100 text-sm font-medium">Average Duration</p>
          <p className="text-3xl font-bold mt-1">—</p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading occupant details...</p>
        </div>
      ) : filteredAndSortedOccupants.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">🏠</div>
          <p className="text-lg text-gray-700 font-medium">
            {searchTerm
              ? 'No occupants found matching your search.'
              : 'No occupant records found.'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {searchTerm
              ? 'Try adjusting your search criteria.'
              : 'Occupant records will appear here once available.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredAndSortedOccupants.map((occupant, index) => (
            <div
              key={occupant._id || index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-blue-500"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      House No. {occupant.houseNo || 'N/A'}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Duration: {calculateDuration(occupant.moveInDate)}
                    </p>
                  </div>
                  <div className="bg-blue-100 rounded-full p-3">
                    <span className="text-2xl">🏠</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Name
                    </p>
                    <p className="text-lg font-medium text-gray-900">
                      {occupant.name || 'N/A'}
                    </p>
                  </div>

                  {occupant.mobile && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Mobile
                      </p>
                      <a
                        href={`tel:${occupant.mobile}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {occupant.mobile}
                      </a>
                    </div>
                  )}

                  {occupant.occupation && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Occupation
                      </p>
                      <p className="text-gray-700">{occupant.occupation}</p>
                    </div>
                  )}

                  {occupant.moveInDate && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Move-in Date
                      </p>
                      <p className="text-gray-700">
                        {new Date(occupant.moveInDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OccupantDetails;
