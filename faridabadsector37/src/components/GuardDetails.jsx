import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const GuardDetails = () => {
  const [guards, setGuards] = useState([
    {
      shift: 'Day Time',
      location: 'Main Gate',
      name: 'Kailash',
      mobile: '8750631430',
    },
    {
      shift: 'Night Time',
      location: 'Main Gate',
      name: 'Narnath',
      mobile: '8468957987',
    },
    {
      shift: 'Day Time',
      location: 'Gate No 2',
      name: 'Anand Mishra',
      mobile: '9650812709',
    },
    {
      shift: 'Night Time',
      location: 'Roaming',
      name: 'Deepak',
      mobile: '9718916312',
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGuards();
  }, []);

  const fetchGuards = async () => {
    setLoading(true);
    try {
      const response = await api.get('/guards');
      if (response.data && response.data.length > 0) {
        setGuards(response.data);
      }
    } catch (error) {
      console.error('Error fetching guards:', error);
      // Keep default guards if API fails
    } finally {
      setLoading(false);
    }
  };

  const getShiftColor = (shift) => {
    if (shift.toLowerCase().includes('day')) {
      return 'bg-gradient-to-r from-yellow-400 to-orange-400';
    }
    return 'bg-gradient-to-r from-blue-600 to-indigo-600';
  };

  return (
    <section className="mb-6 md:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>🛡️</span> Guard Details & Contacts
      </h2>

      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading guard details...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {guards.map((guard, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-blue-500 hover:shadow-lg transition-shadow"
            >
              <div className={`${getShiftColor(guard.shift)} p-3 md:p-4 text-white`}>
                <h3 className="font-semibold text-base md:text-lg">{guard.shift}</h3>
                <p className="text-xs md:text-sm opacity-90">{guard.location}</p>
              </div>
              <div className="p-4 md:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-base md:text-lg font-semibold text-gray-800 truncate">
                      {guard.name}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 truncate">{guard.location}</p>
                  </div>
                  <div className="bg-blue-50 rounded-full p-2 md:p-3 ml-2 flex-shrink-0">
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                </div>
                <a
                  href={`tel:${guard.mobile}`}
                  className="block w-full text-center px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base font-medium"
                >
                  Call: {guard.mobile}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">⚠️ Emergency Instructions:</span> In
          emergencies, call the guard first, then notify a committee member.
        </p>
        <p className="text-xs text-gray-600 mt-2">
          Please save these numbers for quick access.
        </p>
      </div>
    </section>
  );
};

export default GuardDetails;
