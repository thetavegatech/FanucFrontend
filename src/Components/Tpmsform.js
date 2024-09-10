import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const TPMSForm = () => {
  const [formData, setFormData] = useState({
    lossType: '',
    machineId: '',
    empId: '',
    actionTaken: '',
    status: ''
  });

  const [tpmsData, setTpmsData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchTpmsData();
  }, []);

  const fetchTpmsData = async () => {
    try {
      const machineId = '1234'; // Example machineId
      const response = await axios.get(`http://localhost:5001/api/tpmsdata/machine/${machineId}`);
      setTpmsData(response.data);
    } catch (error) {
      console.error('Error fetching TPMS data', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateTpms(editId);
    } else {
      await createTpms();
    }
    setShowForm(false); // Hide the form after submission
  };

  const createTpms = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/tpmsdata', formData);
      setTpmsData([...tpmsData, response.data]);
      resetForm();
    } catch (error) {
      console.error('Error creating TPMS entry', error);
    }
  };

  const updateTpms = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5001/api/tpmsdata/${id}`, formData);
      setTpmsData(tpmsData.map(item => item._id === id ? response.data : item));
      resetForm();
    } catch (error) {
      console.error('Error updating TPMS entry', error);
    }
  };

  const deleteTpms = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/tpmsdata/${id}`);
      setTpmsData(tpmsData.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting TPMS entry', error);
    }
  };

  const resetForm = () => {
    setFormData({
      lossType: '',
      machineId: '',
      empId: '',
      actionTaken: '',
      status: ''
    });
    setEditId(null);
  };

  const handleEdit = (item) => {
    setFormData({
      lossType: item.lossType,
      machineId: item.machineId,
      empId: item.empId,
      actionTaken: item.actionTaken,
      status: item.status
    });
    setEditId(item._id);
    setShowForm(true); // Show the form when editing
  };

  return (
    <div className="container mt-4">
      <h2>TPMS Form</h2>

      {/* Button to Show/Hide Form */}
      {!showForm && (
        <button
          className="btn btn-primary mb-3"
          onClick={() => setShowForm(true)}
        >
          Add Data
        </button>
      )}

      {/* Conditional Rendering of Form */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Loss Type</label>
                <input
                  type="text"
                  name="lossType"
                  className="form-control"
                  placeholder="Loss Type"
                  value={formData.lossType}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Machine ID</label>
                <input
                  type="text"
                  name="machineId"
                  className="form-control"
                  placeholder="Machine ID"
                  value={formData.machineId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Employee ID</label>
                <input
                  type="text"
                  name="empId"
                  className="form-control"
                  placeholder="Employee ID"
                  value={formData.empId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Action Taken</label>
                <input
                  type="text"
                  name="actionTaken"
                  className="form-control"
                  placeholder="Action Taken"
                  value={formData.actionTaken}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Status</label>
                <input
                  type="text"
                  name="status"
                  className="form-control"
                  placeholder="Status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            {editId ? 'Update' : 'Create'}
          </button>
          <button
            type="button"
            className="btn btn-secondary mt-3 ml-2"
            onClick={() => {
              resetForm();
              setShowForm(false); // Hide the form on cancel
            }}
          >
            Clear
          </button>
        </form>
      )}

      {/* Table to Display TPMS Data */}
      <h2 className="mt-5">TPMS Data</h2>
      <table className="table table-bordered table-striped mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Loss Type</th>
            <th>Machine ID</th>
            <th>Employee ID</th>
            <th>Action Taken</th>
            <th>Status</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tpmsData.map(item => (
            <tr key={item._id}>
              <td>{item.lossType}</td>
              <td>{item.machineId}</td>
              <td>{item.empId}</td>
              <td>{item.actionTaken}</td>
              <td>{item.status}</td>
              <td>{new Date(item.updatedAt).toLocaleString()}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(item)}>Edit</button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => deleteTpms(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TPMSForm;
