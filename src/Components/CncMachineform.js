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

  // Fetch machine data on component mount
  useEffect(() => {
    fetchMachines();
  }, []);

  const orgid = "BajajOrg"

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
    if (isEditing) {
      await axios.put(`http://localhost:5001/api/machines/machine/${editId}`, formData);
      setIsEditing(false);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5001/api/machines/register', formData);
    }
    fetchMachines(); // Refresh machine list
    resetForm();
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
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5001/api/machines/machine/${id}`);
    fetchMachines(); // Refresh machine list
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Manage CNC Machines</h1>

      {/* Form to Add/Edit Machine */}
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

        {/* Second row of fields */}
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

        {/* Third row of fields */}
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

        {/* Fourth row of fields */}
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

        {/* Fifth row of fields */}
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

        {/* Sixth row of fields */}
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

        {/* Other Details */}
        <div className="form-group mt-3">
          <label>Other Details</label>
          <textarea
            name="otherDetails"
            className="form-control"
            value={formData.otherDetails}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          {isEditing ? 'Update Machine' : 'Add Machine'}
        </button>
      </form>

      {/* Display Table of Machines */}
      <h2 className="mt-5">Machine List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Machine ID</th>
            <th>Organization ID</th>
            <th>Machine Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {machines.map((machine) => (
            <tr key={machine._id}>
              <td>{machine.machineId}</td>
              <td>{machine.organizationId}</td>
              <td>{machine.machineName}</td>
              <td>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => handleEdit(machine)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(machine.machineId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CncMachineform;
