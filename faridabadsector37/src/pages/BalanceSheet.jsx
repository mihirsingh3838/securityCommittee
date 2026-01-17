import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const BalanceSheet = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await api.get('/payments');
      if (response.data) {
        setPayments(response.data);
        calculateSummary(response.data);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSummary = (data) => {
    const income = data
      .filter((p) => p.type === 'income')
      .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    const expenses = data
      .filter((p) => p.type === 'expense')
      .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

    setSummary({
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Balance Sheet
        </h1>
        <p className="text-sm md:text-base text-gray-600">Monthly & cumulative financials</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading financial data...</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-4 md:p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-xs md:text-sm font-medium">Total Income</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1 md:mt-2">₹{summary.totalIncome.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-4xl md:text-5xl opacity-20">💰</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-4 md:p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-xs md:text-sm font-medium">Total Expenses</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1 md:mt-2">₹{summary.totalExpenses.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-4xl md:text-5xl opacity-20">💸</div>
              </div>
            </div>

            <div
              className={`rounded-xl shadow-lg p-4 md:p-6 text-white ${
                summary.balance >= 0
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                  : 'bg-gradient-to-br from-orange-500 to-orange-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/90 text-xs md:text-sm font-medium">Balance</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1 md:mt-2">
                    ₹{summary.balance.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="text-4xl md:text-5xl opacity-20">📊</div>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-gray-700 to-gray-800">
              <h2 className="text-lg md:text-xl font-semibold text-white">Financial Transactions</h2>
            </div>
            {payments.length === 0 ? (
              <div className="p-8 md:p-12 text-center text-gray-500">
                <p className="text-base md:text-lg">No transactions found.</p>
                <p className="text-xs md:text-sm mt-2">Financial records will appear here once available.</p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                        Description
                      </th>
                      <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        House
                      </th>
                      <th className="px-3 md:px-6 py-2 md:py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment, index) => (
                      <tr key={payment._id || index} className="hover:bg-gray-50">
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                          {payment.date
                            ? new Date(payment.date).toLocaleDateString()
                            : 'N/A'}
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 md:px-3 py-1 text-xs font-semibold rounded-full ${
                              payment.type === 'income'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {payment.type === 'income' ? 'Income' : 'Expense'}
                          </span>
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-900 hidden md:table-cell">
                          {payment.description || 'No description'}
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-600">
                          {payment.houseNo || 'N/A'}
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-semibold text-right">
                          <span
                            className={
                              payment.type === 'income'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }
                          >
                            {payment.type === 'income' ? '+' : '-'}₹
                            {parseFloat(payment.amount || 0).toLocaleString('en-IN')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BalanceSheet;
