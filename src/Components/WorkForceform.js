// components/WorkForceManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkForceForm = () => {
  const [workforces, setWorkforces] = useState([]);
  const [formData, setFormData] = useState({
    EmpName: '',
    EmpEmail: '',
    EmpPhone: '',
    Role: '',
    Skills: '',
    Performance: '',
    TokenNo: '',
    AssignMachine: '',
    SkillId: '',
    EmpId: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch workforce data on component mount
  useEffect(() => {
    fetchWorkforces();
  }, []);

  const fetchWorkforces = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/workforce');
      setWorkforces(response.data);
    } catch (error) {
      console.error('Error fetching workforce data:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5001/api/workforce/${editId}`, formData);
      setIsEditing(false);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5001/api/workforce', formData);
    }
    fetchWorkforces(); // Refresh workforce list
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      EmpName: '',
      EmpEmail: '',
      EmpPhone: '',
      Role: '',
      Skills: '',
      Performance: '',
      TokenNo: '',
      AssignMachine: '',
      SkillId: '',
      EmpId: ''
    });
  };

  const handleEdit = (workforce) => {
    setIsEditing(true);
    setEditId(workforce._id);
    setFormData(workforce);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5001/api/workforce/${id}`);
    fetchWorkforces(); // Refresh workforce list
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Manage WorkForce</h1>

      {/* Form to Add/Edit Workforce */}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Employee Name</label>
              <input
                type="text"
                name="EmpName"
                className="form-control"
                value={formData.EmpName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Employee Email</label>
              <input
                type="email"
                name="EmpEmail"
                className="form-control"
                value={formData.EmpEmail}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Employee Phone</label>
              <input
                type="text"
                name="EmpPhone"
                className="form-control"
                value={formData.EmpPhone}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                name="Role"
                className="form-control"
                value={formData.Role}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Skills</label>
              <input
                type="text"
                name="Skills"
                className="form-control"
                value={formData.Skills}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Performance</label>
              <input
                type="text"
                name="Performance"
                className="form-control"
                value={formData.Performance}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Token No</label>
              <input
                type="text"
                name="TokenNo"
                className="form-control"
                value={formData.TokenNo}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Assign Machine</label>
              <input
                type="text"
                name="AssignMachine"
                className="form-control"
                value={formData.AssignMachine}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Skill ID</label>
              <input
                type="text"
                name="SkillId"
                className="form-control"
                value={formData.SkillId}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Employee ID</label>
              <input
                type="text"
                name="EmpId"
                className="form-control"
                value={formData.EmpId}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update WorkForce' : 'Add WorkForce'}
        </button>
      </form>

      {/* Display Table of Workforces */}
      <h2 className="mt-5">WorkForce List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Skills</th>
            <th>Performance</th>
            <th>Token No</th>
            <th>Assign Machine</th>
            <th>Skill ID</th>
            <th>Employee ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workforces.map((workforce) => (
            <tr key={workforce._id}>
              <td>{workforce.EmpName}</td>
              <td>{workforce.EmpEmail}</td>
              <td>{workforce.EmpPhone}</td>
              <td>{workforce.Role}</td>
              <td>{workforce.Skills}</td>
              <td>{workforce.Performance}</td>
              <td>{workforce.TokenNo}</td>
              <td>{workforce.AssignMachine}</td>
              <td>{workforce.SkillId}</td>
              <td>{workforce.EmpId}</td>
              <td>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => handleEdit(workforce)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(workforce._id)}
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

export default WorkForceForm;
