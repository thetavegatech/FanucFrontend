import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Utility function to format date for datetime-local input
const formatDateForInput = (dateString) => {
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
  return adjustedDate.toISOString().slice(0, 16); // Format to 'YYYY-MM-DDTHH:MM'
};

const OperatorPerformanceform = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [form, setForm] = useState({
    efficiency: '',
    machineId: '',
    empId: '',
    errorRate: '',
    performanceScore: '',
    createdAt: '',
    updatedAt: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch operator performance data
  const fetchPerformanceData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/operator-performance');
      setPerformanceData(response.data);
    } catch (error) {
      console.error('Error fetching performance data', error);
    }
  };

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5001/api/operator-performance/${editingId}`, form);
        alert('Performance record updated successfully!');
      } else {
        await axios.post('http://localhost:5001/api/operator-performance', form);
        alert('Performance record created successfully!');
      }
      fetchPerformanceData();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving performance data', error);
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({
      efficiency: '',
      machineId: '',
      empId: '',
      errorRate: '',
      performanceScore: '',
      createdAt: '',
      updatedAt: ''
    });
    setEditingId(null);
  };

  // Handle edit
  const handleEdit = (data) => {
    setForm({
      efficiency: data.efficiency,
      machineId: data.machineId,
      empId: data.empId,
      errorRate: data.errorRate,
      performanceScore: data.performanceScore,
      createdAt: formatDateForInput(data.createdAt),
      updatedAt: formatDateForInput(data.updatedAt)
    });
    setEditingId(data._id);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this performance record?')) {
      try {
        await axios.delete(`http://localhost:5001/api/operator-performance/${id}`);
        alert('Performance record deleted successfully!');
        fetchPerformanceData();
      } catch (error) {
        console.error('Error deleting performance data', error);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4">Operator Performance Manager</h2>
      {!showForm ? (
        <>
          <button className="btn btn-primary mb-3" onClick={() => setShowForm(true)}>
            Add Performance
          </button>

          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">Efficiency</th>
                <th scope="col">Machine ID</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Error Rate</th>
                <th scope="col">Performance Score</th>
                <th scope="col">Created At</th>
                <th scope="col">Updated At</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((data) => (
                <tr key={data._id}>
                  <td>{data.efficiency}</td>
                  <td>{data.machineId}</td>
                  <td>{data.empId}</td>
                  <td>{data.errorRate}</td>
                  <td>{data.performanceScore}</td>
                  <td>{new Date(data.createdAt).toLocaleString()}</td>
                  <td>{new Date(data.updatedAt).toLocaleString()}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(data)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(data._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <form onSubmit={handleFormSubmit} className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Efficiency</label>
            <input
              type="text"
              className="form-control"
              name="efficiency"
              value={form.efficiency}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Machine ID</label>
            <input
              type="text"
              className="form-control"
              name="machineId"
              value={form.machineId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Employee ID</label>
            <input
              type="text"
              className="form-control"
              name="empId"
              value={form.empId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Error Rate</label>
            <input
              type="number"
              className="form-control"
              name="errorRate"
              value={form.errorRate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Performance Score</label>
            <input
              type="number"
              className="form-control"
              name="performanceScore"
              value={form.performanceScore}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Created At</label>
            <input
              type="datetime-local"
              className="form-control"
              name="createdAt"
              value={form.createdAt}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Updated At</label>
            <input
              type="datetime-local"
              className="form-control"
              name="updatedAt"
              value={form.updatedAt}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Performance' : 'Add Performance'}
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default OperatorPerformanceform;
