import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

const MaintenanceScheduleForm = () => {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    machineId: '',
    elementId: '',
    elementName: '',
    elementDescription: '',
    type: '',
    frequency: '',
    conditionTag: '',
    remark: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch maintenance schedules on component mount
  useEffect(() => {
    fetchSchedules();
  }, []);

  const mid = "MACHINE457"

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/maintenance/machine/${mid}`);
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching maintenance schedules:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5001/api/maintenance/${editId}`, formData);
      setIsEditing(false);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5001/api/maintenance', formData);
    }
    fetchSchedules(); // Refresh schedule list
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      machineId: '',
      elementId: '',
      elementName: '',
      elementDescription: '',
      type: '',
      frequency: '',
      conditionTag: '',
      remark: ''
    });
  };

  const handleEdit = (schedule) => {
    setIsEditing(true);
    setEditId(schedule.elementId);
    setFormData(schedule);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/maintenance/${id}`);
    fetchSchedules(); // Refresh schedule list
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Manage Maintenance Schedules</h1>

      {/* Form to Add/Edit Maintenance Schedule */}
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
              <label>Element ID</label>
              <input
                type="text"
                name="elementId"
                className="form-control"
                value={formData.elementId}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Element Name</label>
              <input
                type="text"
                name="elementName"
                className="form-control"
                value={formData.elementName}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Element Description</label>
              <input
                type="text"
                name="elementDescription"
                className="form-control"
                value={formData.elementDescription}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Type</label>
              <input
                type="text"
                name="type"
                className="form-control"
                value={formData.type}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Frequency</label>
              <input
                type="text"
                name="frequency"
                className="form-control"
                value={formData.frequency}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Condition Tag</label>
              <input
                type="text"
                name="conditionTag"
                className="form-control"
                value={formData.conditionTag}
                onChange={handleInputChange}
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

        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update Schedule' : 'Add Schedule'}
        </button>
      </form>

      {/* Display Table of Maintenance Schedules */}
      <h2 className="mt-5">Maintenance Schedule List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Machine ID</th>
            <th>Element ID</th>
            <th>Element Name</th>
            <th>Element Description</th>
            <th>Type</th>
            <th>Frequency</th>
            <th>Condition Tag</th>
            <th>Remark</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule._id}>
              <td>{schedule.machineId}</td>
              <td>{schedule.elementId}</td>
              <td>{schedule.elementName}</td>
              <td>{schedule.elementDescription}</td>
              <td>{schedule.type}</td>
              <td>{schedule.frequency}</td>
              <td>{schedule.conditionTag}</td>
              <td>{schedule.remark}</td>
              <td>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => handleEdit(schedule)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(schedule.elementId)}
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

export default MaintenanceScheduleForm;
