import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const CommitteeMembers = () => {
  const [members, setMembers] = useState([
    {
      house: '70',
      mobile: '9868133456',
      name: 'Dalvir Aggarwal',
      designation: 'Chairperson (Pocket Representative)',
    },
    {
      house: '62',
      mobile: '9818307400',
      name: 'J N Jha',
      designation: 'Vice-Chairperson (Co-Representative)',
    },
    {
      house: '211',
      mobile: '9818129793',
      name: 'Dinesh Ganotra',
      designation: 'Treasurer',
    },
    {
      house: '208',
      mobile: '9810975805',
      name: 'Jitender Kumar Baluja',
      designation: 'Member',
    },
    {
      house: '156',
      mobile: '9811190337',
      name: 'Shashi Mangla',
      designation: 'Member',
    },
    {
      house: '90',
      mobile: '8527361744',
      name: 'Shakuntala Ji',
      designation: 'Member',
    },
    {
      house: '149',
      mobile: '9811063264',
      name: 'Ajay Bhaskar',
      designation: 'Member – CCTV Maintenance',
    },
    {
      house: '83',
      mobile: '9718218987',
      name: 'Raj Kumar Sharma',
      designation: 'Member',
    },
    {
      house: '114',
      mobile: '9971441882',
      name: 'Ashish',
      designation: 'Member – Street Lighting',
    },
    {
      house: '—',
      mobile: '8800367280',
      name: 'Yogesh Singhal',
      designation: 'Member',
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/members');
      if (response.data && response.data.length > 0) {
        setMembers(response.data);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      // Keep default members if API fails
    } finally {
      setLoading(false);
    }
  };

  const getDesignationColor = (designation) => {
    if (designation.toLowerCase().includes('chairperson')) {
      return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900';
    }
    if (designation.toLowerCase().includes('vice')) {
      return 'bg-gradient-to-r from-blue-400 to-blue-500 text-white';
    }
    if (designation.toLowerCase().includes('treasurer')) {
      return 'bg-gradient-to-r from-green-400 to-green-500 text-white';
    }
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <section className="mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span>👥</span> Committee Members
        </h2>
        <span className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full self-start sm:self-auto">
          Term: 12 Oct 2025 – 11 Oct 2028
        </span>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading members...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    House
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-semibold uppercase tracking-wider hidden md:table-cell">
                    Designation
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members.map((member, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span className="text-xs sm:text-sm font-medium text-gray-900">
                        {member.house}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <a
                        href={`tel:${member.mobile}`}
                        className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {member.mobile}
                      </a>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div>
                        <span className="text-xs sm:text-sm font-medium text-gray-900 block">
                          {member.name}
                        </span>
                        <span className={`md:hidden inline-flex px-2 py-0.5 text-xs font-semibold rounded-full mt-1 ${getDesignationColor(
                          member.designation
                        )}`}>
                          {member.designation.length > 20 ? member.designation.substring(0, 20) + '...' : member.designation}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                      <span
                        className={`inline-flex px-2 sm:px-3 py-1 text-xs font-semibold rounded-full ${getDesignationColor(
                          member.designation
                        )}`}
                      >
                        {member.designation}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-4">
        For changes, contact the Chairperson or Treasurer.
      </p>
    </section>
  );
};

export default CommitteeMembers;
