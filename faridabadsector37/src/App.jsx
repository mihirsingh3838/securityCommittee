import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import BalanceSheet from './pages/BalanceSheet';
import PaymentHistory from './pages/PaymentHistory';
import OccupantDetails from './pages/OccupantDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/balance-sheet" element={<BalanceSheet />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/occupant-details" element={<OccupantDetails />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;