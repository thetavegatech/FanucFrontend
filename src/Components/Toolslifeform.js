// components/ToolDetailsManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Toollifeform = () => {
  const [toolDetails, setToolDetails] = useState([]);
  const [formData, setFormData] = useState({
    machineId: '',
    toolId: '',
    machineName: '',
    toolNumber: '',
    toolName: '',
    setLife: '',
    toolChangeDate: '',
    actualLife: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch tool details data on component mount
  useEffect(() => {
    fetchToolDetails();
  }, []);

  const fetchToolDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/tools');
      setToolDetails(response.data);
    } catch (error) {
      console.error('Error fetching tool details data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5001/api/tools/${editId}`, formData);
      setIsEditing(false);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5001/api/tools', formData);
    }
    fetchToolDetails(); // Refresh tool details list
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      machineId: '',
      toolId: '',
      machineName: '',
      toolNumber: '',
      toolName: '',
      setLife: '',
      toolChangeDate: '',
      actualLife: ''
    });
  };

  const handleEdit = (tool) => {
    setIsEditing(true);
    setEditId(tool.toolId);
    setFormData(tool);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5001/api/tools/${id}`);
    fetchToolDetails(); // Refresh tool details list
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Manage Tool Details</h1>

      {/* Form to Add/Edit Tool Details */}
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
              <label>Tool ID</label>
              <input
                type="text"
                name="toolId"
                className="form-control"
                value={formData.toolId}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Machine Name</label>
              <input
                type="text"
                name="machineName"
                className="form-control"
                value={formData.machineName}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Tool Number</label>
              <input
                type="text"
                name="toolNumber"
                className="form-control"
                value={formData.toolNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Tool Name</label>
              <input
                type="text"
                name="toolName"
                className="form-control"
                value={formData.toolName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Set Life</label>
              <input
                type="text"
                name="setLife"
                className="form-control"
                value={formData.setLife}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Tool Change Date</label>
              <input
                type="date"
                name="toolChangeDate"
                className="form-control"
                value={formData.toolChangeDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Actual Life</label>
              <input
                type="text"
                name="actualLife"
                className="form-control"
                value={formData.actualLife}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update Tool Details' : 'Add Tool Details'}
        </button>
      </form>

      {/* Display Table of Tool Details */}
      <h2 className="mt-5">Tool Details List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Machine ID</th>
            <th>Tool ID</th>
            <th>Machine Name</th>
            <th>Tool Number</th>
            <th>Tool Name</th>
            <th>Set Life</th>
            <th>Tool Change Date</th>
            <th>Actual Life</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {toolDetails.map((tool) => (
            <tr key={tool._id}>
              <td>{tool.machineId}</td>
              <td>{tool.toolId}</td>
              <td>{tool.machineName}</td>
              <td>{tool.toolNumber}</td>
              <td>{tool.toolName}</td>
              <td>{tool.setLife}</td>
              <td>{new Date(tool.toolChangeDate).toLocaleDateString()}</td>
              <td>{tool.actualLife}</td>
              <td>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => handleEdit(tool)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(tool.toolId)}
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

export default Toollifeform;
