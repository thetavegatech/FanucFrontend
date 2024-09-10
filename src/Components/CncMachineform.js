import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CncMachineform = () => {
  const [machines, setMachines] = useState([]);
  const [formData, setFormData] = useState({
    machineId: '',
    organizationId: '',
    assetId: '',
    machineName: '',
    machineType: '',
    status: '',
    location: '',
    AssignedOperator: '',
    machineMake: '',
    machineModel: '',
    machineController: '',
    yearOfManufacturing: '',
    machineIP: '',
    spindleCount: '',
    batteryCount: '',
    machineCapacity: '',
    powerRating: '',
    machineCategory: '',
    otherDetails: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMachines();
  }, []);

  const orgid = "ORG001";

  const fetchMachines = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/machines/${orgid}`);
      setMachines(response.data);
    } catch (error) {
      console.error('Error fetching machine data:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5001/api/machines/machine/${editId}`, formData);
        alert('Record updated successfully'); // Success message for update
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post('http://localhost:5001/api/machines/register', formData);
        alert('Data saved successfully'); // Success message for creation
      }
      fetchMachines(); // Refresh machine list
      resetForm();
      setShowForm(false); // Hide form after submission
    } catch (error) {
      console.error('Error saving data:', error);
      alert('An error occurred while saving data');
    }
  };

  const resetForm = () => {
    setFormData({
      machineId: '',
      organizationId: '',
      assetId: '',
      machineName: '',
      machineType: '',
      status: '',
      location: '',
      AssignedOperator: '',
      machineMake: '',
      machineModel: '',
      machineController: '',
      yearOfManufacturing: '',
      machineIP: '',
      spindleCount: '',
      batteryCount: '',
      machineCapacity: '',
      powerRating: '',
      machineCategory: '',
      otherDetails: ''
    });
  };

  const handleEdit = (machine) => {
    setIsEditing(true);
    setEditId(machine.machineId);
    setFormData(machine);
    setShowForm(true); // Show form for editing
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`http://localhost:5001/api/machines/machine/${id}`);
        alert('Record deleted successfully'); // Success message for deletion
        fetchMachines(); // Refresh machine list
      } catch (error) {
        console.error('Error deleting record:', error);
        alert('An error occurred while deleting the record');
      }
    }
  };

  return (
    <div className="container mt-1">
      <h1 className="mb-1">Manage CNC Machines</h1>

      {/* Button to Show Form */}
      {!showForm && (
        <button className="btn btn-primary mb-1" onClick={() => setShowForm(true)}>
          Add Data
        </button>
      )}

      {/* Conditional Rendering: Form or Table */}
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Machine ID</label>
                <input
                  type="text"
                  name="machineId"
                  className="form-control"
                  value={formData.machineId}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Organization ID</label>
                <input
                  type="text"
                  name="organizationId"
                  className="form-control"
                  value={formData.organizationId}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Asset ID</label>
                <input
                  type="text"
                  name="assetId"
                  className="form-control"
                  value={formData.assetId}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Machine Name</label>
                <input
                  type="text"
                  name="machineName"
                  className="form-control"
                  value={formData.machineName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Machine Type</label>
                <input
                  type="text"
                  name="machineType"
                  className="form-control"
                  value={formData.machineType}
                  onChange={handleInputChange}
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
                  value={formData.status}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Assigned Operator</label>
                <input
                  type="text"
                  name="AssignedOperator"
                  className="form-control"
                  value={formData.AssignedOperator}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Machine Make</label>
                <input
                  type="text"
                  name="machineMake"
                  className="form-control"
                  value={formData.machineMake}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Machine Model</label>
                <input
                  type="text"
                  name="machineModel"
                  className="form-control"
                  value={formData.machineModel}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Machine Controller</label>
                <input
                  type="text"
                  name="machineController"
                  className="form-control"
                  value={formData.machineController}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Year of Manufacturing</label>
                <input
                  type="number"
                  name="yearOfManufacturing"
                  className="form-control"
                  value={formData.yearOfManufacturing}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Machine IP</label>
                <input
                  type="text"
                  name="machineIP"
                  className="form-control"
                  value={formData.machineIP}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Spindle Count</label>
                <input
                  type="number"
                  name="spindleCount"
                  className="form-control"
                  value={formData.spindleCount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Battery Count</label>
                <input
                  type="number"
                  name="batteryCount"
                  className="form-control"
                  value={formData.batteryCount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Machine Capacity</label>
                <input
                  type="text"
                  name="machineCapacity"
                  className="form-control"
                  value={formData.machineCapacity}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Power Rating</label>
                <input
                  type="text"
                  name="powerRating"
                  className="form-control"
                  value={formData.powerRating}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Machine Category</label>
                <input
                  type="text"
                  name="machineCategory"
                  className="form-control"
                  value={formData.machineCategory}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Other Details</label>
                <textarea
                  name="otherDetails"
                  className="form-control"
                  rows="3"
                  value={formData.otherDetails}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Record' : 'Save Data'}
          </button>
          <button type="button" className="btn btn-secondary ml-2" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Machine ID</th>
              <th>Organization ID</th>
              <th>Asset ID</th>
              <th>Machine Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {machines.map(machine => (
              <tr key={machine.machineId}>
                <td>{machine.machineId}</td>
                <td>{machine.organizationId}</td>
                <td>{machine.assetId}</td>
                <td>{machine.machineName}</td>
                <td>
                  <button className="btn btn-info btn-sm" onClick={() => handleEdit(machine)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(machine.machineId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CncMachineform;
