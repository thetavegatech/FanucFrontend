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
  const [showForm, setShowForm] = useState(false);

  // Fetch parts data on component mount
  useEffect(() => {
    fetchParts();
  }, []);

  const mid = "MACHINE457"; // Static machine ID for demonstration purposes

  const fetchParts = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/part/getall`);
      setParts(response.data);
    } catch (error) {
      // window.alert("Part is allready exist against the Machine")
      console.error('Error fetching part data:', error);
     
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5001/api/part/update/${editId}`, formData);
        window.alert('Record updated successfully!');
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post('http://localhost:5001/api/part/create', formData);
        window.alert('Record created successfully!');
      }
      fetchParts(); // Refresh parts list
      resetForm();
      setShowForm(false); // Hide form after submission
    } catch (error) {
      console.error('Error saving part data:', error);
    }
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
    setShowForm(true); // Show form for editing
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this record?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5001/api/part/delete/${id}`);
        window.alert('Record deleted successfully!');
        fetchParts(); // Refresh parts list
      } catch (error) {
        console.error('Error deleting part:', error);
      }
    }
  };

  const handleAdd = () => {
    setIsEditing(false);
    setEditId(null);
    resetForm();
    setShowForm(true); // Show form for adding
  };


  const [machineIds, setMachineIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch machine data and extract only the machine IDs
  const fetchMachineData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/machines/ORG001');
      const machineIds = response.data.map(machine => machine.machineId); // Extract machine IDs
      setMachineIds(machineIds); // Set only the machine IDs in state
      setLoading(false); // Set loading to false after data is loaded
    } catch (err) {
      setError('Error fetching machine data');
      setLoading(false); // Ensure loading is stopped in case of an error
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchMachineData();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Manage Parts</h1>

      {/* Button to Add New Part */}
      {!showForm && (
        <button className="btn btn-primary mb-3" onClick={handleAdd}>
          Add New Part
        </button>
      )}

      {/* Conditionally Render Form */}
      {showForm && (
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

                {/* Loading state */}
                {loading ? (
                  <p>Loading machine IDs...</p>
                ) : error ? (
                  <p>{error}</p> // Show error message if there is an error
                ) : (
                  <select
                    name="machineId"
                    className="form-control"
                    value={formData.machineId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select Machine ID</option>
                    {machineIds.map((id, index) => (
                      <option key={index} value={id}>{id}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary me-2">
            {isEditing ? 'Update Part' : 'Add Part'}
          </button>
        </form>
      )}

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
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(part)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger me-2"
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
