import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import * as XLSX from 'xlsx';

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
const EXCEL_HEADERS = ['Sr No', 'House No', 'Floor', 'Title', 'Name', 'Mobile'];

function parseExcelFile(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = (e) => {
      try {
        const wb = XLSX.read(e.target.result, { type: 'binary' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
        if (!rows.length) {
          resolve([]);
          return;
        }
        const rawHeaders = rows[0].map((h) => String(h ?? '').trim());
        const keyMap = {};
        EXCEL_HEADERS.forEach((h) => {
          const i = rawHeaders.findIndex((rh) => rh.toLowerCase() === h.toLowerCase());
          if (i >= 0) keyMap[h] = i;
        });
        const idx = (m, k) => (m[k] != null && m[k] >= 0 ? m[k] : -1);
        const houseNoCol = idx(keyMap, 'House No');
        const floorCol = idx(keyMap, 'Floor');
        const titleCol = idx(keyMap, 'Title');
        const nameCol = idx(keyMap, 'Name');
        const mobileCol = idx(keyMap, 'Mobile');
        if (houseNoCol < 0 || nameCol < 0) {
          reject(new Error('Excel must have "House No" and "Name" columns.'));
          return;
        }
        const out = [];
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          const houseNo = row[houseNoCol] != null ? String(row[houseNoCol]).trim() : '';
          const name = row[nameCol] != null ? String(row[nameCol]).trim() : '';
          if (!houseNo && !name) continue;
          out.push({
            houseNo,
            floor: floorCol >= 0 && row[floorCol] != null ? String(row[floorCol]).trim() : '',
            title: titleCol >= 0 && row[titleCol] != null ? String(row[titleCol]).trim() : '',
            name,
            mobile: mobileCol >= 0 && row[mobileCol] != null ? String(row[mobileCol]).trim() : '',
          });
        }
        resolve(out);
      } catch (err) {
        reject(err);
      }
    };
    r.onerror = () => reject(new Error('Failed to read file'));
    r.readAsBinaryString(file);
  });
}

export const OccupantsManager = () => {
  const manager = useManager('occupants', {
    houseNo: '',
    name: '',
    mobile: '',
    floor: '',
    title: '',
  });
  const [showUpload, setShowUpload] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [parsed, setParsed] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [importing, setImporting] = useState(false);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setUploadFile(f);
    setParsed([]);
    setUploadError('');
    if (!f) return;
    parseExcelFile(f)
      .then((rows) => {
        setParsed(rows);
        if (!rows.length) setUploadError('No valid rows found. Ensure "House No" and "Name" exist.');
      })
      .catch((err) => {
        setUploadError(err.message || 'Invalid Excel file');
      });
  };

  const handleImport = async () => {
    if (!parsed.length) return;
    setImporting(true);
    setUploadError('');
    try {
      const { data } = await api.post('/occupants/bulk', parsed);
      const msg = `Imported: ${data.created} created, ${data.updated} updated.` +
        (data.errors?.length ? ` ${data.errors.length} errors.` : '');
      alert(msg);
      setUploadFile(null);
      setParsed([]);
      setShowUpload(false);
      manager.fetchItems();
    } catch (err) {
      setUploadError(err.response?.data?.message || err.message || 'Import failed');
    } finally {
      setImporting(false);
    }
  };

  if (manager.loading) return <div className="text-center py-8">Loading...</div>;

  const initialForm = { houseNo: '', name: '', mobile: '', floor: '', title: '' };

  return (
    <ManagerLayout
      title="Manage Occupants"
      showForm={manager.showForm}
      onToggleForm={() => {
        manager.setShowForm(!manager.showForm);
        manager.setFormData(initialForm);
      }}
      extraButtons={
        <button
          type="button"
          onClick={() => setShowUpload(!showUpload)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          {showUpload ? 'Close Upload' : 'Upload Excel'}
        </button>
      }
      extraSection={
        showUpload && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Upload Excel</h3>
            <p className="text-sm text-gray-600 mb-3">
              Use columns: <strong>Sr No</strong>, <strong>House No</strong>, <strong>Floor</strong>, <strong>Title</strong>, <strong>Name</strong>, <strong>Mobile</strong>. Title is prepended to Name when importing.
            </p>
            <div className="flex flex-wrap gap-3 items-end mb-4">
              <label className="flex-1 min-w-[200px]">
                <span className="block text-sm font-medium text-gray-700 mb-1">Select file (.xlsx / .xls)</span>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:font-medium"
                />
              </label>
              {parsed.length > 0 && (
                <button
                  type="button"
                  onClick={handleImport}
                  disabled={importing}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                >
                  {importing ? 'Importing…' : `Import ${parsed.length} occupants`}
                </button>
              )}
            </div>
            {uploadError && (
              <p className="text-sm text-red-600 mb-3">{uploadError}</p>
            )}
            {parsed.length > 0 && (
              <div className="overflow-x-auto max-h-48 overflow-y-auto rounded border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-gray-600">House No</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-600">Floor</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-600">Title</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-600">Name</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-600">Mobile</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {parsed.slice(0, 20).map((r, i) => (
                      <tr key={i}>
                        <td className="px-3 py-2">{r.houseNo}</td>
                        <td className="px-3 py-2">{r.floor}</td>
                        <td className="px-3 py-2">{r.title}</td>
                        <td className="px-3 py-2">{r.name}</td>
                        <td className="px-3 py-2">{r.mobile}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {parsed.length > 20 && (
                  <p className="text-xs text-gray-500 px-3 py-2 bg-gray-50">Showing first 20 of {parsed.length} rows.</p>
                )}
              </div>
            )}
          </div>
        )
      }
      formContent={
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const { houseNo, house, name, mobile, floor, title, _id } = manager.formData;
            const fullName = _id
              ? (name || '').trim()
              : (title ? `${String(title).trim()} ${String(name).trim()}`.trim() : (name || '').trim());
            const payload = {
              houseNo: houseNo || house,
              house: houseNo || house,
              name: fullName,
              mobile: mobile || '',
              floor: floor || '',
              title: title || '',
            };
            try {
              if (_id) {
                await api.put(`/occupants/${_id}`, payload);
              } else {
                await api.post('/occupants', payload);
              }
              manager.fetchItems();
              manager.setShowForm(false);
              manager.setFormData(initialForm);
            } catch (err) {
              alert(err.response?.data?.message || 'Error saving occupant');
            }
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="House No" value={manager.formData.houseNo || manager.formData.house} onChange={(e) => manager.setFormData({ ...manager.formData, houseNo: e.target.value, house: e.target.value })} className="px-4 py-2 border rounded-lg" required />
            <input type="text" placeholder="Floor" value={manager.formData.floor} onChange={(e) => manager.setFormData({ ...manager.formData, floor: e.target.value })} className="px-4 py-2 border rounded-lg" />
            <input type="text" placeholder="Title (e.g. Sh.)" value={manager.formData.title} onChange={(e) => manager.setFormData({ ...manager.formData, title: e.target.value })} className="px-4 py-2 border rounded-lg" />
            <input type="text" placeholder="Name" value={manager.formData.name} onChange={(e) => manager.setFormData({ ...manager.formData, name: e.target.value })} className="px-4 py-2 border rounded-lg" required />
            <input type="tel" placeholder="Mobile" value={manager.formData.mobile} onChange={(e) => manager.setFormData({ ...manager.formData, mobile: e.target.value })} className="px-4 py-2 border rounded-lg" />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
        </form>
      }
      tableContent={
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">House</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Floor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {manager.items.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.houseNo || item.house}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.floor ?? '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.title ?? '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.name || item.ownerName || item.currentOccupant?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{(item.mobile || item.ownerMobile) || '—'}</td>
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
const ManagerLayout = ({ title, showForm, onToggleForm, formContent, tableContent, extraButtons, extraSection }) => (
  <div>
    <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {extraButtons}
        {onToggleForm && (
          <button
            onClick={onToggleForm}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {showForm ? 'Cancel' : '+ Add New'}
          </button>
        )}
      </div>
    </div>

    {showForm && formContent && (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {formContent}
      </div>
    )}

    {extraSection}

    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {tableContent}
    </div>
  </div>
);
