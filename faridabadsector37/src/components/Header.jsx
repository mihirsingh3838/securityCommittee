import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/balance-sheet', label: 'Balance Sheet' },
    { path: '/payment-history', label: 'Payment History' },
    { path: '/occupant-details', label: 'Resident Details' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 md:py-6">
          {/* Logo and Title */}
          <div className="flex-shrink-0 flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 leading-tight">
              Pocket A, Sector 37: Security Committee for Residents and Families
            </h1>
            <p className="text-blue-50 text-xs sm:text-sm md:text-base mt-1 leading-relaxed">
              Building a Secure & Connected Society Together
            </p>
            {/* <p className="text-blue-100 text-xs mt-1">
              Term: 12 Oct 2025 — 11 Oct 2028
            </p> */}
          </div>

          {/* Admin Link */}
          <div className="hidden md:block ml-4">
            <a
              href="/admin/login"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg transition-colors text-sm font-medium shadow-md"
            >
              Admin
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block border-t border-blue-500/30 pt-3 md:pt-4 pb-3 md:pb-4`}>
          <div className="flex flex-col md:flex-row gap-2 md:gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg transition-all duration-200 text-sm md:text-base ${isActive(link.path)
                    ? 'bg-blue-500 text-white font-semibold shadow-md'
                    : 'text-blue-50 hover:bg-blue-500/50 hover:text-white'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg transition-all duration-200 text-blue-50 hover:bg-blue-500/50 hover:text-white md:hidden text-sm"
            >
              Admin
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
