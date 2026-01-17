import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

// Generic Manager Component Helper
const useManager = (endpoint, initialFormData) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.get(`/${endpoint}`);
      setItems(response.data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await api.put(
          `/${endpoint}/${formData._id}`,
          formData
        );
      } else {
        await api.post(
          `/${endpoint}`,
          formData
        );
      }
      fetchItems();
      setShowForm(false);
      setFormData(initialFormData);
    } catch (error) {
      alert(`Error saving ${endpoint}`);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await api.delete(`/${endpoint}/${id}`);
      fetchItems();
    } catch (error) {
      alert(`Error deleting ${endpoint}`);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setShowForm(true);
  };

  return {
    items,
    loading,
    showForm,
    setShowForm,
    formData,
    setFormData,
    handleSubmit,
    handleDelete,
    handleEdit,
    fetchItems
  };
};

// Members Manager
export const MembersManager = () => {
  const manager = useManager('members', {
    house: '',
    mobile: '',
    name: '',
    designation: '',
    email: '',
  });

  if (manager.loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <ManagerLayout
      title="Manage Committee Members"
      showForm={manager.showForm}
      onToggleForm={() => {
        manager.setShowForm(!manager.showForm);
        manager.setFormData({ house: '', mobile: '', name: '', designation: '', email: '' });
      }}
      formContent={
        <form onSubmit={manager.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="House No" value={manager.formData.house} onChange={(e) => manager.setFormData({ ...manager.formData, house: e.target.value })} className="px-4 py-2 border rounded-lg" required />
            <input type="text" placeholder="Name" value={manager.formData.name} onChange={(e) => manager.setFormData({ ...manager.formData, name: e.target.value })} className="px-4 py-2 border rounded-lg" required />
            <input type="tel" placeholder="Mobile" value={manager.formData.mobile} onChange={(e) => manager.setFormData({ ...manager.formData, mobile: e.target.value })} className="px-4 py-2 border rounded-lg" required />
            <input type="text" placeholder="Designation" value={manager.formData.designation} onChange={(e) => manager.setFormData({ ...manager.formData, designation: e.target.value })} className="px-4 py-2 border rounded-lg" required />
            <input type="email" placeholder="Email (optional)" value={manager.formData.email} onChange={(e) => manager.setFormData({ ...manager.formData, email: e.target.value })} className="px-4 py-2 border rounded-lg" />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
        </form>
      }
      tableContent={
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">House</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Designation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {manager.items.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.house}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.mobile}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.designation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button onClick={() => manager.handleEdit(item)} className="text-blue-600 mr-3">Edit</button>
                  <button onClick={() => manager.handleDelete(item._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    />
  );
};

// Payments Manager
export const PaymentsManager = () => {
  const manager = useManager('payments', {
    houseNo: '',
    name: '',
    mobile: '',
    amount: '',
    type: 'income',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  if (manager.loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <ManagerLayout
      title="Manage Payments"
      showForm={manager.showForm}
      onToggleForm={() => {
        manager.setShowForm(!manager.showForm);
        manager.setFormData({ houseNo: '', name: '', mobile: '', amount: '', type: 'income', description: '', date: new Date().toISOString().split('T')[0] });
      }}
      formContent={
        <form onSubmit={manager.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="House No" value={manager.formData.houseNo} onChange={(e) => manager.setFormData({ ...manager.formData, houseNo: e.target.value })} className="px-4 py-2 border rounded-lg" required />
            <input type="text" placeholder="Name" value={manager.formData.name} onChange={(e) => manager.setFormData({ ...manager.formData, name: e.target.value })} className="px-4 py-2 border rounded-lg" required />
            <input type="tel" placeholder="Mobile" value={manager.formData.mobile} onChange={(e) => manager.setFormData({ ...manager.formData, mobile: e.target.value })} className="px-4 py-2 border rounded-lg" />
            <input type="number" placeholder="Amount" value={manager.formData.amount} onChange={(e) => manager.setFormData({ ...manager.formData, amount: e.target.value })} className="px-4 py-2 border rounded-lg" required />
            <select value={manager.formData.type} onChange={(e) => manager.setFormData({ ...manager.formData, type: e.target.value })} className="px-4 py-2 border rounded-lg">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input type="date" value={manager.formData.date} onChange={(e) => manager.setFormData({ ...manager.formData, date: e.target.value })} className="px-4 py-2 border rounded-lg" required />
          </div>
          <textarea placeholder="Description" value={manager.formData.description} onChange={(e) => manager.setFormData({ ...manager.formData, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg" rows={3} />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
        </form>
      }
      tableContent={
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">House</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {manager.items.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(item.date || item.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.houseNo || item.house}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.name || item.residentName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded ${item.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.type || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">₹{item.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button onClick={() => manager.handleEdit(item)} className="text-blue-600 mr-3">Edit</button>
                  <button onClick={() => manager.handleDelete(item._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    />
  );
};

// Occupants Manager
export const OccupantsManager = () => {
  const manager = useManager('occupants', {
    houseNo: '',
    name: '',
    mobile: '',
    occupation: '',
    moveInDate: new Date().toISOString().split('T')[0],
  });

  if (manager.loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <ManagerLayout
      title="Manage Occupants"
      showForm={manager.showForm}
      onToggleForm={() => {
        manager.setShowForm(!manager.showForm);
        manager.setFormData({ houseNo: '', name: '', mobile: '', occupation: '', moveInDate: new Date().toISOString().split('T')[0] });
      }}
      formContent={
        <form onSubmit={manager.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="House No" value={manager.formData.houseNo || manager.formData.house} onChange={(e) => manager.setFormData({ ...manager.formData, houseNo: e.target.value, house: e.target.value })} className="px-4 py-2 border rounded-lg" required />
            <input type="text" placeholder="Name" value={manager.formData.name} onChange={(e) => manager.setFormData({ ...manager.formData, name: e.target.value })} className="px-4 py-2 border rounded-lg" required />
            <input type="tel" placeholder="Mobile" value={manager.formData.mobile} onChange={(e) => manager.setFormData({ ...manager.formData, mobile: e.target.value })} className="px-4 py-2 border rounded-lg" />
            <input type="text" placeholder="Occupation" value={manager.formData.occupation} onChange={(e) => manager.setFormData({ ...manager.formData, occupation: e.target.value })} className="px-4 py-2 border rounded-lg" />
            <input type="date" placeholder="Move-in Date" value={manager.formData.moveInDate || manager.formData.occupancySince} onChange={(e) => manager.setFormData({ ...manager.formData, moveInDate: e.target.value, occupancySince: e.target.value })} className="px-4 py-2 border rounded-lg" />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
        </form>
      }
      tableContent={
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">House</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Move-in Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {manager.items.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.houseNo || item.house}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.name || item.ownerName || item.currentOccupant?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.mobile || item.ownerMobile}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(item.moveInDate || item.occupancySince).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button onClick={() => manager.handleEdit(item)} className="text-blue-600 mr-3">Edit</button>
                  <button onClick={() => manager.handleDelete(item._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    />
  );
};

// Guards Manager
export const GuardsManager = () => {
  const manager = useManager('guards', {
    name: '',
    mobile: '',
    shift: '',
    location: '',
  });

  if (manager.loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <ManagerLayout
      title="Manage Guards"
      showForm={manager.showForm}
      onToggleForm={() => {
        manager.setShowForm(!manager.showForm);
        manager.setFormData({ name: '', mobile: '', shift: '', location: '' });
      }}
      formContent={
        <form onSubmit={manager.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Name" value={manager.formData.name} onChange={(e) => manager.setFormData({ ...manager.formData, name: e.target.value })} className="px-4 py-2 border rounded-lg" required />
            <input type="tel" placeholder="Mobile" value={manager.formData.mobile} onChange={(e) => manager.setFormData({ ...manager.formData, mobile: e.target.value })} className="px-4 py-2 border rounded-lg" required />
            <select value={manager.formData.shift || manager.formData.duty} onChange={(e) => manager.setFormData({ ...manager.formData, shift: e.target.value, duty: e.target.value })} className="px-4 py-2 border rounded-lg">
              <option value="">Select Shift</option>
              <option value="day-main">Day Time (Main Gate)</option>
              <option value="night-main">Night Time (Main Gate)</option>
              <option value="day-gate2">Day Time (Gate No 2)</option>
              <option value="night-roaming">Night Time (Roaming)</option>
            </select>
            <input type="text" placeholder="Location" value={manager.formData.location} onChange={(e) => manager.setFormData({ ...manager.formData, location: e.target.value })} className="px-4 py-2 border rounded-lg" required />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
        </form>
      }
      tableContent={
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shift</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {manager.items.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.mobile}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.shift || item.duty}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button onClick={() => manager.handleEdit(item)} className="text-blue-600 mr-3">Edit</button>
                  <button onClick={() => manager.handleDelete(item._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    />
  );
};

// Suggestions Manager
export const SuggestionsManager = () => {
  const manager = useManager('suggestions', {
    name: '',
    houseNo: '',
    mobile: '',
    suggestion: '',
    status: 'new',
  });

  if (manager.loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <ManagerLayout
      title="Manage Suggestions"
      showForm={false}
      onToggleForm={() => {}}
      formContent={null}
      tableContent={
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">House</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Suggestion</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {manager.items.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.houseNo || item.house}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.name}</td>
                <td className="px-6 py-4 text-sm">{item.suggestion?.substring(0, 50)}...</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <select value={item.status} onChange={(e) => {
                    api.put(`/suggestions/${item._id}`, { status: e.target.value })
                      .then(() => manager.fetchItems());
                  }} className="px-2 py-1 border rounded text-xs">
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="implemented">Implemented</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button onClick={() => manager.handleDelete(item._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    />
  );
};

// Complaints Manager
export const ComplaintsManager = () => {
  const manager = useManager('complaints', {
    name: '',
    houseNo: '',
    mobile: '',
    complaintType: '',
    subject: '',
    description: '',
    urgency: 'medium',
    status: 'pending',
  });

  if (manager.loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <ManagerLayout
      title="Manage Complaints"
      showForm={false}
      onToggleForm={() => {}}
      formContent={null}
      tableContent={
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">House</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Urgency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {manager.items.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.houseNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.complaintType}</td>
                <td className="px-6 py-4 text-sm">{item.subject?.substring(0, 30)}...</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.urgency === 'high' ? 'bg-red-100 text-red-800' :
                    item.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.urgency}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <select value={item.status} onChange={(e) => {
                    api.put(`/complaints/${item._id}`, { status: e.target.value })
                      .then(() => manager.fetchItems());
                  }} className="px-2 py-1 border rounded text-xs">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button onClick={() => manager.handleDelete(item._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    />
  );
};

// Layout Component
const ManagerLayout = ({ title, showForm, onToggleForm, formContent, tableContent }) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {onToggleForm && (
        <button
          onClick={onToggleForm}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : '+ Add New'}
        </button>
      )}
    </div>

    {showForm && formContent && (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {formContent}
      </div>
    )}

    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {tableContent}
    </div>
  </div>
);
