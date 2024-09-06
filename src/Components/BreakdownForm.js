import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BreakdownForm = () => {
  const [breakdowns, setBreakdowns] = useState([]);
  const [formData, setFormData] = useState({
    machineName: '',
    machineId: '',
    breakdownReason: '',
    breakdownStartDate: '',
    breakdownEndDate: '',
    breakdownStartTime: '',
    breakdownEndTime: '',
    assignedTechnician: '',
    remark: '',
    shift: '',
    lineName: '',
    operations: '',
    breakdownPhenomenons: '',
    breakdownType: '',
    actionTaken: '',
    whyWhyAnalysis: '',
    rootCause: '',
    targetDate: '',
    responsibility: '',
    hd: '',
    status: 'open',
    location: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch breakdown data on component mount
  useEffect(() => {
    fetchBreakdowns();
  }, []);

  const mid = "MACHINE457"

  const fetchBreakdowns = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/breakdowns?machineId=${mid}`);
      setBreakdowns(response.data);
    } catch (error) {
      console.error('Error fetching breakdown data:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5001/api/breakdowns/${editId}`, formData);
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post('http://localhost:5001/api/breakdowns', formData);
      }
      fetchBreakdowns(); // Refresh breakdown list
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      machineName: '',
      machineId: '',
      breakdownReason: '',
      breakdownStartDate: '',
      breakdownEndDate: '',
      breakdownStartTime: '',
      breakdownEndTime: '',
      assignedTechnician: '',
      remark: '',
      shift: '',
      lineName: '',
      operations: '',
      breakdownPhenomenons: '',
      breakdownType: '',
      actionTaken: '',
      whyWhyAnalysis: '',
      rootCause: '',
      targetDate: '',
      responsibility: '',
      hd: '',
      status: 'open',
      location: ''
    });
  };

  const handleEdit = (breakdown) => {
    setIsEditing(true);
    setEditId(breakdown._id);
    setFormData(breakdown);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/breakdowns/${id}`);
      fetchBreakdowns(); // Refresh breakdown list
    } catch (error) {
      console.error('Error deleting breakdown:', error);
    }
  };


  // const handleDelete = async (id) => {
  //   await axios.delete(`http://localhost:5001/api/machines/machine/${id}`);
  //   fetchMachines(); // Refresh machine list
  // };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Manage Breakdowns</h1>

      {/* Form to Add/Edit Breakdown */}
      <form onSubmit={handleSubmit}>
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
              <label>Breakdown Reason</label>
              <input
                type="text"
                name="breakdownReason"
                className="form-control"
                value={formData.breakdownReason}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Breakdown Start Date</label>
              <input
                type="date"
                name="breakdownStartDate"
                className="form-control"
                value={formData.breakdownStartDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Breakdown End Date</label>
              <input
                type="date"
                name="breakdownEndDate"
                className="form-control"
                value={formData.breakdownEndDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Breakdown Start Time</label>
              <input
                type="text"
                name="breakdownStartTime"
                className="form-control"
                value={formData.breakdownStartTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Breakdown End Time</label>
              <input
                type="text"
                name="breakdownEndTime"
                className="form-control"
                value={formData.breakdownEndTime}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Assigned Technician</label>
              <input
                type="text"
                name="assignedTechnician"
                className="form-control"
                value={formData.assignedTechnician}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Remark</label>
              <input
                type="text"
                name="remark"
                className="form-control"
                value={formData.remark}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Shift</label>
              <input
                type="text"
                name="shift"
                className="form-control"
                value={formData.shift}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Line Name</label>
              <input
                type="text"
                name="lineName"
                className="form-control"
                value={formData.lineName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Operations</label>
              <input
                type="text"
                name="operations"
                className="form-control"
                value={formData.operations}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Breakdown Phenomenons</label>
              <input
                type="text"
                name="breakdownPhenomenons"
                className="form-control"
                value={formData.breakdownPhenomenons}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Breakdown Type</label>
              <input
                type="text"
                name="breakdownType"
                className="form-control"
                value={formData.breakdownType}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Action Taken</label>
              <input
                type="text"
                name="actionTaken"
                className="form-control"
                value={formData.actionTaken}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Why-Why Analysis</label>
              <input
                type="text"
                name="whyWhyAnalysis"
                className="form-control"
                value={formData.whyWhyAnalysis}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Root Cause</label>
              <input
                type="text"
                name="rootCause"
                className="form-control"
                value={formData.rootCause}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Target Date</label>
              <input
                type="text"
                name="targetDate"
                className="form-control"
                value={formData.targetDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Responsibility</label>
              <input
                type="text"
                name="responsibility"
                className="form-control"
                value={formData.responsibility}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>HD</label>
              <input
                type="text"
                name="hd"
                className="form-control"
                value={formData.hd}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="in-progress">In Progress</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update Breakdown' : 'Add Breakdown'}
        </button>
      </form>

      {/* Display Table of Breakdowns */}
      <h2 className="mt-5">Breakdown List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Machine Name</th>
            <th>Machine ID</th>
            <th>Breakdown Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {breakdowns.map((breakdown) => (
            <tr key={breakdown._id}>
              <td>{breakdown.machineName}</td>
              <td>{breakdown.machineId}</td>
              <td>{breakdown.breakdownReason}</td>
              <td>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => handleEdit(breakdown)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(breakdown._id)}
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

export default BreakdownForm;
