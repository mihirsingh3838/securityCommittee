import React from 'react';
import { Link } from 'react-router-dom';

const QuickAccess = () => {
  const quickLinks = [
    {
      icon: '📒',
      title: 'View Balance Sheet',
      description: 'Monthly & cumulative financials',
      link: '/balance-sheet',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: '💰',
      title: 'Payment History',
      description: 'Search by House / Mobile / Name',
      link: '/payment-history',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: '🏠',
      title: 'Occupant Details',
      description: 'Current occupants & durations',
      link: '/occupant-details',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: '🎥',
      title: 'CCTV Policy & Layout',
      description: 'Camera map, retention & privacy',
      link: '#',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: '🏛️',
      title: 'Haryana Property Tax Portal',
      description: 'Official ULB Haryana login (OTP based)',
      link: 'https://ulbharyana.gov.in',
      external: true,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <section className="mb-6 md:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>🔗</span> Quick Access
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {quickLinks.map((item, index) => {
          const LinkComponent = item.external ? 'a' : Link;
          const linkProps = item.external
            ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' }
            : { to: item.link };

          return (
            <LinkComponent
              key={index}
              {...linkProps}
              className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${item.color} p-4 md:p-6 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-95`}
            >
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl mb-2 md:mb-3">{item.icon}</div>
                <h3 className="text-base md:text-lg font-semibold mb-1 leading-tight">{item.title}</h3>
                <p className="text-xs md:text-sm text-white/90 leading-relaxed">{item.description}</p>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </LinkComponent>
          );
        })}
      </div>
    </section>
  );
};

export default QuickAccess;
