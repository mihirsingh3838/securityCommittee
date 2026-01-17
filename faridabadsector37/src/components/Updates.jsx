import React from 'react';

const Updates = () => {
  const updates = [
    {
      date: 'DD:MM:YYYY',
      content: 'Yet to be updated.',
      new: false,
    },
    {
      date: 'DD:MM:YYYY',
      content: 'Yet to be updated.',
      new: false,
    },
    {
      date: 'Reminder',
      content: 'Yet to be updated.',
      new: false,
    },
  ];

  return (
    <section className="mb-6 md:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>📄</span> What's New
      </h2>
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        {updates.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No updates at this time. Check back soon!
          </p>
        ) : (
          <ul className="space-y-4">
            {updates.map((update, index) => (
              <li
                key={index}
                className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0"
              >
                <div className="flex-shrink-0 w-24 text-sm font-medium text-gray-600">
                  {update.date}
                </div>
                <div className="flex-1">
                  <p className="text-gray-700">{update.content}</p>
                  {update.new && (
                    <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                      NEW
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Updates;
