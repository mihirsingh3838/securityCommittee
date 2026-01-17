import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      _id: '1',
      title: 'Important Notice — Property Tax Collection',
      content: 'Property Tax collection by ULB Haryana is currently open. All residents are requested to please pay their property tax at the earliest.',
      date: new Date().toISOString(),
      important: true,
      links: [
        { text: 'Pay Property Tax (Official Portal)', url: 'https://ulbharyana.gov.in' },
        { text: 'Pay Water / Sewer Charges', url: 'https://ulbharyana.gov.in' },
      ],
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await api.get('/announcements');
      if (response.data && response.data.length > 0) {
        setAnnouncements(response.data);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
      // Keep default announcement if API fails
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-6 md:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>📣</span> Announcements
      </h2>
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading announcements...</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            <p>No announcements at this time. Check back soon!</p>
          </div>
        ) : (
          announcements.map((announcement) => (
            <div
              key={announcement._id}
              className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${
                announcement.important
                  ? 'border-orange-500 bg-orange-50/30'
                  : 'border-blue-500'
              }`}
            >
              <div className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 leading-tight">
                    {announcement.important && (
                      <span className="text-orange-600 mr-2">📢</span>
                    )}
                    {announcement.title}
                  </h3>
                  {announcement.date && (
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(announcement.date).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed">
                  {announcement.content}
                </p>
                {announcement.links && announcement.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {announcement.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 bg-blue-600 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <span className="truncate max-w-[150px] md:max-w-none">{link.text}</span>
                        <svg
                          className="w-3 h-3 md:w-4 md:h-4 ml-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <p className="text-sm text-gray-500 mt-4 italic">
        Important notices will appear here. Keep checking — we are evolving!
      </p>
    </section>
  );
};

export default Announcements;
