import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Shiftform = () => {
  const [shifts, setShifts] = useState([]);
  const [shiftForm, setShiftForm] = useState({
    startTime: '',
    endTime: '',
    shiftNumber: '',
    breakTime: ''
  });
  const [editingShiftId, setEditingShiftId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch shift data
  const fetchShifts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/shifts');
      setShifts(response.data);
    } catch (error) {
      console.error('Error fetching shifts', error);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShiftForm({ ...shiftForm, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingShiftId) {
        await axios.put(`http://localhost:5001/api/shifts/${editingShiftId}`, shiftForm);
        alert('Shift updated successfully!');
      } else {
        await axios.post('http://localhost:5001/api/shifts', shiftForm);
        alert('Shift created successfully!');
      }
      fetchShifts();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving shift', error);
    }
  };

  // Reset form
  const resetForm = () => {
    setShiftForm({
      startTime: '',
      endTime: '',
      shiftNumber: '',
      breakTime: ''
    });
    setEditingShiftId(null);
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    // Adjust for timezone difference (local time)
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().slice(0, 16); // Format to 'YYYY-MM-DDTHH:MM'
  };

  // Handle edit
  const handleEdit = (shift) => {
    setShiftForm({
      startTime: formatDateForInput(shift.startTime),
      endTime: formatDateForInput(shift.endTime),
      shiftNumber: shift.shiftNumber,
      breakTime: shift.breakTime
    });
    setEditingShiftId(shift._id);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this shift?')) {
      try {
        await axios.delete(`http://localhost:5001/api/shifts/${id}`);
        fetchShifts();
      } catch (error) {
        console.error('Error deleting shift', error);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4">Shift Manager</h2>
      {!showForm ? (
        <>
          <button className="btn btn-primary mb-3" onClick={() => setShowForm(true)}>
            Add New Shift
          </button>

          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">Start Time</th>
                <th scope="col">End Time</th>
                <th scope="col">Shift Number</th>
                <th scope="col">Break Time (min)</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => (
                <tr key={shift._id}>
                  <td>{new Date(shift.startTime).toLocaleString()}</td>
                  <td>{new Date(shift.endTime).toLocaleString()}</td>
                  <td>{shift.shiftNumber}</td>
                  <td>{shift.breakTime}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(shift)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(shift._id)}>
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
          <div className="col-md-3">
            <label className="form-label">Start Time</label>
            <input
              type="datetime-local"
              className="form-control"
              name="startTime"
              value={shiftForm.startTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">End Time</label>
            <input
              type="datetime-local"
              className="form-control"
              name="endTime"
              value={shiftForm.endTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Shift Number</label>
            <input
              type="number"
              className="form-control"
              name="shiftNumber"
              value={shiftForm.shiftNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Break Time (minutes)</label>
            <input
              type="number"
              className="form-control"
              name="breakTime"
              value={shiftForm.breakTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              {editingShiftId ? 'Update Shift' : 'Add Shift'}
            </button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Shiftform;
