import React from 'react';
import QuickAccess from '../components/QuickAccess';
import Announcements from '../components/Announcements';
import CommitteeMembers from '../components/CommitteeMembers';
import GuardDetails from '../components/GuardDetails';
import SuggestionForm from '../components/SuggestionForm';
import ComplaintForm from '../components/ComplaintForm';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8">
      {/* Hero Section */}
      <div className="text-center mb-8 md:mb-12 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
          Welcome to Your Pocket A Society
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-2">
          Connect, Stay Informed, and Build a Better Neighborhood Together — Your One-Stop Portal for Pocket A Parivar, Sector 37, Faridabad
        </p>
      </div>

      {/* Quick Access Section */}
      <div className="px-2 sm:px-0">
        <QuickAccess />
      </div>

      {/* Announcements Section */}
      <div className="px-2 sm:px-0">
        <Announcements />
      </div>

      {/* Explore Faridabad Section */}
      <section className="mb-8 px-2 sm:px-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🌆</span> Explore Faridabad
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md p-4 md:p-6 border-l-4 border-blue-500">
          <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
            Access official planning documents, development initiatives, and future growth plans for Faridabad and surrounding sectors to stay ahead of community development.
          </p>
          <a
            href="#"
            className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            📍 View Faridabad Development Plan
            <svg
              className="w-4 h-4 md:w-5 md:h-5 ml-2"
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
          <p className="text-xs sm:text-sm text-gray-500 mt-3 italic">
            Source: Planning & Development authorities
          </p>
        </div>
      </section>

      {/* Committee Members Section */}
      <div className="px-2 sm:px-0">
        <CommitteeMembers />
      </div>

      {/* Guard Details Section */}
      <div className="px-2 sm:px-0">
        <GuardDetails />
      </div>

      {/* Community Business Highlights */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📢</span> Community Business Highlights
        </h2>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🏪</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Feature Your Local Services
            </h3>
            <p className="text-gray-600 mb-6">
              Reserve a slot to promote your resident-run business in our community directory.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              To reserve: contact us or use the suggestion form below with your business details.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg">
              Book a Spot
            </button>
          </div>
        </div>
      </section>

      {/* Complaint Form Section */}
      <ComplaintForm />

      {/* Suggestion Form Section */}
      <SuggestionForm />

      {/* Footer */}
      <footer className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200 text-center px-4">
        <p className="text-sm md:text-base text-gray-600">
          © 2026 Mihir Singh, Pocket A — We are evolving. Send suggestions.
        </p>
      </footer>
    </div>
  );
};

export default Home;
