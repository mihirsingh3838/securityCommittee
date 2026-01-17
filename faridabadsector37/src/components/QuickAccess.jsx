import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const QuickAccess = () => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showUPIModal, setShowUPIModal] = useState(false);
  const [showWelfareModal, setShowWelfareModal] = useState(false);

  const welfareProjects = [
    { title: 'CCTVs coverage enhancement', status: 'initiated', icon: '🎥' },
    { title: 'Lights Installation at Blind Spots', status: 'initiated', icon: '💡' },
    { title: 'Beautification of Hanuman Vatika', status: 'initiated', icon: '🌳' },
    { title: 'Guard Room/ Porta Cabin', status: 'proposed', icon: '🏠' },
    { title: 'Power Back up/Solar panels for CCTVs', status: 'proposed', icon: '☀️' },
  ];
  
  // Update this with your actual UPI ID and QR code image path
  const upiId = '9891227942@ptyes'; // Replace with actual UPI ID
  const payeeName = 'Archana Rai'; // Replace with actual name
  const qrCodeImage = '/qr-code.jpeg'; // QR code image in public folder

  const emergencyContacts = [
    { name: 'Police', number: '112', color: 'from-blue-500 to-blue-600' },
    { name: 'Fire', number: '101', color: 'from-red-500 to-red-600' },
    { name: 'Ambulance', number: '108', color: 'from-green-500 to-green-600' },
    { name: 'Women Helpline', number: '1091', color: 'from-pink-500 to-pink-600' },
    { name: 'Child Helpline', number: '1098', color: 'from-orange-500 to-orange-600' },
  ];

  const handleUPIPayment = () => {
    // UPI payment link format
    const upiPaymentLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&cu=INR&tn=Monthly Security Contribution`;
    
    // Try to open UPI app
    window.location.href = upiPaymentLink;
    
    // If UPI app doesn't open, show modal with QR code
    setTimeout(() => {
      setShowUPIModal(true);
    }, 500);
  };

  const copyUPIId = () => {
    navigator.clipboard.writeText(upiId).then(() => {
      alert('UPI ID copied to clipboard!');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = upiId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('UPI ID copied to clipboard!');
    });
  };

  const handleMCFAppClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isAndroid = /android/i.test(userAgent);

    if (isIOS) {
      // Try to open MCF app on iOS using custom URL scheme
      const appScheme = 'mcf311://';
      const appStoreLink = 'https://apps.apple.com/in/app/mcf-311/id6686399037';
      
      // Try to open the app
      window.location.href = appScheme;
      
      // If app is not installed, user will stay on page, so open App Store after delay
      setTimeout(() => {
        window.location.href = appStoreLink;
      }, 500);
    } else if (isAndroid) {
      // Try to open MCF app on Android using intent
      const appIntent = 'intent://#Intent;package=com.citizen.fmc;scheme=mcf311;end';
      const playStoreLink = 'https://play.google.com/store/apps/details?id=com.citizen.fmc';
      
      // Try to open the app
      window.location.href = appIntent;
      
      // Fallback to Play Store if app not installed
      setTimeout(() => {
        window.location.href = playStoreLink;
      }, 500);
    } else {
      // Desktop or unknown device - open Play Store (Android is more common)
      window.open('https://play.google.com/store/apps/details?id=com.citizen.fmc', '_blank');
    }
  };

  const quickLinks = [
    {
      icon: '📒',
      title: 'View Balance Sheet',
      description: 'Monthly & cumulative financials',
      link: '/balance-sheet',
      color: 'from-blue-400 to-blue-500',
    },
    {
      icon: '💰',
      title: 'Payment History',
      description: 'Search by House / Mobile / Name',
      link: '/payment-history',
      color: 'from-emerald-400 to-emerald-500',
    },
    {
      icon: '🏠',
      title: 'Resident Details',
      description: 'Current occupants & durations',
      link: '/occupant-details',
      color: 'from-violet-400 to-violet-500',
    },
    {
      icon: '🎥',
      title: 'CCTV Placement & Coverage Layout',
      description: 'Camera map, retention & privacy',
      link: '#',
      color: 'from-rose-400 to-rose-500',
    },
    {
      icon: '🏛️',
      title: 'Haryana Property Tax Portal',
      description: 'Official ULB Haryana login (OTP based)',
      link: 'https://ulbharyana.gov.in',
      external: true,
      color: 'from-amber-400 to-amber-500',
    },
    {
      icon: '🚨',
      title: 'Emergency Contacts',
      description: 'Quick access to emergency services',
      link: '#',
      isEmergency: true,
      color: 'from-red-400 to-red-500',
    },
    {
      icon: '📱',
      title: 'Download MCF App',
      description: 'Register complaints for street lights & sewer',
      link: '#',
      isMCFApp: true,
      color: 'from-indigo-400 to-indigo-500',
    },
    {
      icon: '💳',
      title: 'Pay Security Contribution',
      description: 'Quick UPI payment for monthly security',
      link: '#',
      isUPI: true,
      color: 'from-cyan-400 to-cyan-500',
    },
    {
      icon: '✨',
      title: 'Welfare Projects',
      description: 'Proposed & initiated community projects',
      link: '#',
      isWelfare: true,
      color: 'from-lime-400 to-lime-500',
    },
  ];

  return (
    <section className="mb-6 md:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>🔗</span> Quick Access
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {quickLinks.map((item, index) => {
          // Handle emergency contacts modal
          if (item.isEmergency) {
            return (
              <button
                key={index}
                onClick={() => setShowEmergencyModal(true)}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${item.color} p-4 md:p-6 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-95 text-left`}
              >
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl mb-2 md:mb-3">{item.icon}</div>
                  <h3 className="text-base md:text-lg font-semibold mb-1 leading-tight">{item.title}</h3>
                  <p className="text-xs md:text-sm text-white/90 leading-relaxed">{item.description}</p>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </button>
            );
          }

          // Handle MCF App download
          if (item.isMCFApp) {
            return (
              <button
                key={index}
                onClick={handleMCFAppClick}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${item.color} p-4 md:p-6 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-95 text-left`}
              >
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl mb-2 md:mb-3">{item.icon}</div>
                  <h3 className="text-base md:text-lg font-semibold mb-1 leading-tight">{item.title}</h3>
                  <p className="text-xs md:text-sm text-white/90 leading-relaxed">{item.description}</p>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </button>
            );
          }

          // Handle UPI Payment
          if (item.isUPI) {
            return (
              <button
                key={index}
                onClick={handleUPIPayment}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${item.color} p-4 md:p-6 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-95 text-left`}
              >
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl mb-2 md:mb-3">{item.icon}</div>
                  <h3 className="text-base md:text-lg font-semibold mb-1 leading-tight">{item.title}</h3>
                  <p className="text-xs md:text-sm text-white/90 leading-relaxed">{item.description}</p>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </button>
            );
          }

          // Handle Welfare Projects
          if (item.isWelfare) {
            return (
              <button
                key={index}
                onClick={() => setShowWelfareModal(true)}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${item.color} p-4 md:p-6 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-95 text-left`}
              >
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl mb-2 md:mb-3">{item.icon}</div>
                  <h3 className="text-base md:text-lg font-semibold mb-1 leading-tight">{item.title}</h3>
                  <p className="text-xs md:text-sm text-white/90 leading-relaxed">{item.description}</p>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </button>
            );
          }

          // Regular links
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

      {/* Emergency Contacts Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowEmergencyModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">🚨 Emergency Contacts</h3>
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <a
                  key={index}
                  href={`tel:${contact.number}`}
                  className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${contact.color} text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-95`}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-2">
                      <svg
                        className="w-5 h-5"
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
                    <div>
                      <p className="font-semibold text-base">{contact.name}</p>
                      <p className="text-white/90 text-sm">Tap to call</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl">{contact.number}</p>
                  </div>
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Tap any number to call immediately
            </p>
          </div>
        </div>
      )}

      {/* UPI Payment Modal */}
      {showUPIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowUPIModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">💳 Pay Security Contribution</h3>
              <button
                onClick={() => setShowUPIModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                <div className="w-48 h-48 flex items-center justify-center">
                  <img 
                    src={qrCodeImage} 
                    alt="UPI QR Code" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const placeholder = e.target.parentElement.querySelector('.qr-placeholder');
                      if (placeholder) placeholder.classList.remove('hidden');
                    }}
                  />
                  <div className="qr-placeholder hidden w-full h-full items-center justify-center text-gray-400 text-xs text-center px-2">
                    QR Code Image
                    <br />
                    (Place your QR code image in public folder)
                  </div>
                </div>
              </div>
            </div>

            {/* UPI ID Display */}
            <div className="bg-teal-50 rounded-xl p-4 mb-6 border border-teal-200">
              <p className="text-xs text-gray-600 mb-2">UPI ID</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-teal-700 font-mono">{upiId}</p>
                <button
                  onClick={copyUPIId}
                  className="px-3 py-1.5 bg-teal-600 text-white text-xs font-semibold rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={() => {
                const upiPaymentLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&cu=INR&tn=Monthly Security Contribution`;
                window.location.href = upiPaymentLink;
              }}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg mb-3"
            >
              Pay via UPI App
            </button>

            <p className="text-xs text-gray-500 text-center">
              Scan QR code or use UPI ID to pay your monthly security contribution
            </p>
          </div>
        </div>
      )}

      {/* Welfare Projects Modal */}
      {showWelfareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowWelfareModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">✨ Proposed Welfare Projects & Initiated</h3>
              <button
                onClick={() => setShowWelfareModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {welfareProjects.map((project, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 ${
                    project.status === 'initiated'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl flex-shrink-0">{project.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{project.title}</h4>
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          project.status === 'initiated'
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-amber-100 text-amber-700 border border-amber-300'
                        }`}
                      >
                        {project.status === 'initiated' ? '✓ Initiated' : '📋 Proposed'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                These projects are part of our ongoing efforts to improve community infrastructure and safety.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default QuickAccess;
