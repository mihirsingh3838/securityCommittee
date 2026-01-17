import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const CommitteeMembers = () => {
  const [members, setMembers] = useState([
    {
      house: '-',
      mobile: '9868302404',
      name: 'Sh. SM Gupta',
      designation: 'President (Pocket A Security Committee)',
    },
    {
      house: '-',
      mobile: '9717240000',
      name: 'Sh.Ajay Garg',
      designation: 'Vice-President (Pocket A Security Committee)',
    },
    {
      house: '-',
      mobile: '9811094209',
      name: 'Sh. Ajay Gupta',
      designation: 'Treasurer',
    },
    {
      house: '-',
      mobile: '9899970683',
      name: 'Sh. Anuj Gera',
      designation: 'Executive Member',
    },
    {
      house: '-',
      mobile: '9910979587',
      name: 'Sh. Atul Mangla',
      designation: 'Executive Member',
    },
    {
      house: '-',
      mobile: '9716514139',
      name: 'Sh. Anuj Rai',
      designation: 'Executive Member',
    },
    // {
    //   house: '149',
    //   mobile: '9811063264',
    //   name: 'Ajay Bhaskar',
    //   designation: 'Member – CCTV Maintenance',
    // },
    // {
    //   house: '83',
    //   mobile: '9718218987',
    //   name: 'Raj Kumar Sharma',
    //   designation: 'Member',
    // },
    // {
    //   house: '114',
    //   mobile: '9971441882',
    //   name: 'Ashish',
    //   designation: 'Member – Street Lighting',
    // },
    {
      house: '140',
      mobile: '8800367280',
      name: 'Sh. Dinesh Sharma',
      designation: 'Executive Member',
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
        {/* <span className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full self-start sm:self-auto">
          Term: 12 Oct 2025 – 11 Oct 2028
        </span> */}
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
                        className="flex items-center gap-2 text-xs sm:text-sm text-blue-600 hover:text-blue-800 transition-colors group"
                      >
                        <svg
                          className="w-4 h-4 text-blue-600 group-hover:text-blue-700 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span className="hover:underline">{member.mobile}</span>
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
