import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PartForm = () => {
  const [parts, setParts] = useState([]);
  const [formData, setFormData] = useState({
    PartName: '',
    PartDescription: '',
    machineId: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch parts data on component mount
  useEffect(() => {
    fetchParts();
  }, []);

  const mid = "MACHINE457"

  const fetchParts = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/part?machineId=${mid}`);
      setParts(response.data);
    } catch (error) {
      console.error('Error fetching part data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5001/api/part/update/${editId}`, formData);
      setIsEditing(false);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5001/api/part/create', formData);
    }
    fetchParts(); // Refresh parts list
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      PartName: '',
      PartDescription: '',
      machineId: ''
    });
  };

  const handleEdit = (part) => {
    setIsEditing(true);
    setEditId(part._id);
    setFormData(part);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5001/api/part/delete/${id}`);
    fetchParts(); // Refresh parts list
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Manage Parts</h1>

      {/* Form to Add/Edit Part */}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Part Name</label>
              <input
                type="text"
                name="PartName"
                className="form-control"
                value={formData.PartName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Part Description</label>
              <input
                type="text"
                name="PartDescription"
                className="form-control"
                value={formData.PartDescription}
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
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update Part' : 'Add Part'}
        </button>
      </form>

      {/* Display Table of Parts */}
      <h2 className="mt-5">Parts List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Part Name</th>
            <th>Part Description</th>
            <th>Machine ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part._id}>
              <td>{part.PartName}</td>
              <td>{part.PartDescription}</td>
              <td>{part.machineId}</td>
              <td>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => handleEdit(part)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(part._id)}
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

export default PartForm;
